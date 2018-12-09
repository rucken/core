import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  ErrorsExtractor,
  ILanguagesItem,
  LangService,
  ModalsService,
  RedirectUriDto,
  TokenService,
  translate,
  User,
  UserTokenDto
} from '@rucken/core';
import { AuthModalComponent, AuthModalTypeEnum } from '@rucken/web';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthModalSignInInfoMessage, AuthModalSignUpInfoMessage } from './app.config';
import { AppRoutes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {
  public title: string;
  public routes = AppRoutes;
  public languages$: Observable<ILanguagesItem[]>;
  public currentUser$: Observable<User>;
  public currentLang$: Observable<string>;
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _langService: LangService,
    private _authService: AuthService,
    private _errorsExtractor: ErrorsExtractor,
    private _tokenService: TokenService,
    private _translateService: TranslateService,
    private _modalsService: ModalsService,
    private _bsLocaleService: BsLocaleService,
    private _router: Router,
    private _metaService: MetaService,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.languages$ = _langService.languages$;
    this.currentUser$ = _authService.current$;
    this.currentLang$ = _langService.current$;
    this._langService.current$.pipe(takeUntil(this._destroyed$)).subscribe(lang => {
      this._bsLocaleService.use(lang);
      this._metaService.setTag('og:locale', lang.toLowerCase() + '-' + lang.toUpperCase());
      this.title = this._translateService.instant(this._metaService.loader.settings.applicationName);
    });
    if (isPlatformBrowser(this._platformId)) {
      this._tokenService.tokenHasExpired$.pipe(takeUntil(this._destroyed$)).subscribe(result => {
        if (result === true) {
          this.onInfo();
        }
      });
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.onInfo();
    }
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  setCurrentLang(value: string) {
    this._langService.current = value;
  }
  onInfo() {
    const token = this._tokenService.current;
    if (token) {
      if (this._tokenService.tokenHasExpired(token)) {
        this._tokenService.stopCheckTokenHasExpired();
        this._modalsService
          .errorAsync({
            error: translate('Your session has expired, please re-login'),
            class: 'modal-md',
            onTop: true
          })
          .then(result => this._authService.signOut().subscribe(data => this.onSignOutSuccess(undefined)));
      } else {
        if (!this._authService.current) {
          this._authService.info(token).subscribe(
            data => this.onSignInOrInfoSuccess(undefined, data),
            error => {
              if (this._errorsExtractor.getErrorMessage(error)) {
                this.onError(error);
              }
              this._authService.signOut().subscribe(data => this.onSignOutSuccess(undefined));
            }
          );
        }
      }
    }
  }
  onSignOut() {
    this.onSignOutAsync().then();
  }
  async onSignOutAsync() {
    const modalRef = await this._modalsService.createAsync<AuthModalComponent>(AuthModalComponent, {
      class: 'modal-md',
      initialState: {
        type: AuthModalTypeEnum.SignOut,
        noTitle: translate('No')
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this._authService.signOut().subscribe(data => this.onSignOutSuccess(modal));
    });
  }
  onSignIn() {
    this.onSignInAsync().then();
  }
  async onSignInAsync() {
    const modalRef = await this._modalsService.createAsync<AuthModalComponent>(AuthModalComponent, {
      class: 'modal-xs',
      initialState: {
        type: AuthModalTypeEnum.SignIn,
        data: {},
        signInInfoMessage: AuthModalSignInInfoMessage,
        signUpInfoMessage: AuthModalSignUpInfoMessage
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      if (modal.yesData) {
        this._authService
          .oauthRedirectUri(modal.yesData)
          .subscribe(data => this.onOauthSignInSuccess(modal, data), error => this.onSignInError(modal, error));
      } else {
        if (modal.type === AuthModalTypeEnum.SignIn) {
          this._authService
            .signIn(modal.data.email, modal.data.password)
            .subscribe(data => this.onSignInOrInfoSuccess(modal, data), error => this.onSignInError(modal, error));
        }
        if (modal.type === AuthModalTypeEnum.SignUp) {
          this._authService
            .signUp(modal.data.email, modal.data.password)
            .subscribe(data => this.onSignInOrInfoSuccess(modal, data), error => this.onSignInError(modal, error));
        }
      }
    });
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUriDto) {
    if (modal) {
      modal.processing = false;
    }
    if (modal) {
      modal.hide();
    }
    this._document.location.href = data.redirect_uri;
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    if (modal) {
      modal.processing = false;
    }
    if (data.token) {
      this._tokenService.current = data.token;
    }
    this._authService.current = data.user;
    if (modal) {
      modal.hide();
    }
    this._tokenService.startCheckTokenHasExpired();
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    if (modal) {
      modal.processing = false;
    }
    this._tokenService.current = undefined;
    this._authService.current = undefined;
    this._router.navigate(['home']);
    if (modal) {
      modal.hide();
    }
  }
  onError(error: any) {
    this._modalsService.error({
      error: error,
      onTop: true
    });
    throw error;
  }
  onSignInError(modal: AuthModalComponent, error: any) {
    if (modal) {
      modal.processing = false;
    }
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    modal.form.externalErrors = this._errorsExtractor.getValidationErrors(error);
    if (!modal.form.externalErrors) {
      this.onError(error);
    }
  }
}
