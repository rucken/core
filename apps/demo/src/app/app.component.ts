import { isPlatformBrowser, DOCUMENT, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  LangService,
  TokenService,
  User,
  translate,
  AuthService,
  UserTokenDto,
  RedirectUriDto
} from '@rucken/core';
import { AuthModalComponent, MessageModalService } from '@rucken/web';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppRoutes } from './app.routes';
import { AuthModalTypeEnum } from '@rucken/web';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  public title: string;
  public routes = AppRoutes;
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public authService: AuthService,
    public langService: LangService,
    private _errorsExtractor: ErrorsExtractor,
    private _tokenService: TokenService,
    private _translateService: TranslateService,
    private _modalService: BsModalService,
    private _messageModalService: MessageModalService,
    private _bsLocaleService: BsLocaleService,
    private _router: Router,
    private _metaService: MetaService,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if (isPlatformBrowser(this._platformId)) {
      this.langService.current$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(lang => {
          this._bsLocaleService.use(lang);
          this._metaService.setTag(
            'og:locale',
            lang.toLowerCase() + '-' + lang.toUpperCase()
          );
          this.title = this._translateService.instant(
            this._metaService.loader.settings.applicationName
          );
        });
      this._tokenService.tokenHasExpired$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(result => {
          if (result === true) {
            this.onInfo();
          }
        });
    }
    if (isPlatformServer(this._platformId)) {
      const lang = this.langService.current;
      this._bsLocaleService.use(lang);
      this._metaService.setTag(
        'og:locale',
        lang.toLowerCase() + '-' + lang.toUpperCase()
      );
      this.title = this._translateService.instant(
        this._metaService.loader.settings.applicationName
      );
    }
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onInfo() {
    const token = this._tokenService.current;
    if (token) {
      if (this._tokenService.tokenHasExpired(token)) {
        this._tokenService.stopCheckTokenHasExpired();
        this._messageModalService
          .error({
            error: translate('Your session has expired, please re-login'),
            class: 'modal-md',
            onTop: true
          })
          .subscribe(result =>
            this.authService
              .signOut()
              .subscribe(data => this.onSignOutSuccess(undefined))
          );
      } else {
        if (!this.authService.current) {
          this.authService.info(token).subscribe(
            data => this.onSignInOrInfoSuccess(undefined, data),
            error => {
              if (this._errorsExtractor.getErrorMessage(error)) {
                this.onError(error);
              }
              this.authService
                .signOut()
                .subscribe(data => this.onSignOutSuccess(undefined));
            }
          );
        }
      }
    }
  }
  onSignOut() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-md',
      initialState: {
        type: AuthModalTypeEnum.SignOut,
        noTitle: translate('No')
      }
    });
    bsModalRef.content.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this.authService
        .signOut()
        .subscribe(data => this.onSignOutSuccess(modal));
    });
  }
  onSignIn() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-xs',
      initialState: {
        type: AuthModalTypeEnum.SignIn,
        data: {}
      }
    });
    bsModalRef.content.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      if (modal.yesData) {
        this.authService
          .oauthRedirectUri(modal.yesData)
          .subscribe(
            data => this.onOauthSignInSuccess(modal, data),
            error => this.onSignInError(modal, error)
          );
      } else {
        if (modal.type === AuthModalTypeEnum.SignIn) {
          this.authService
            .signIn(modal.data.email, modal.data.password)
            .subscribe(
              data => this.onSignInOrInfoSuccess(modal, data),
              error => this.onSignInError(modal, error)
            );
        }
        if (modal.type === AuthModalTypeEnum.SignUp) {
          this.authService
            .signUp(modal.data.email, modal.data.password)
            .subscribe(
              data => this.onSignInOrInfoSuccess(modal, data),
              error => this.onSignInError(modal, error)
            );
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
    this.document.location.href = data.redirect_uri;
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    if (modal) {
      modal.processing = false;
    }
    this._tokenService.current = data.token;
    this.authService.current = data.user;
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
    this.authService.current = undefined;
    this._router.navigate(['home']);
    if (modal) {
      modal.hide();
    }
  }
  onError(error: any) {
    this._messageModalService
      .error({
        error: error,
        onTop: true
      })
      .subscribe();
    throw error;
  }
  onSignInError(modal: AuthModalComponent, error: any) {
    if (modal) {
      modal.processing = false;
    }
    modal.form.externalErrors = this._errorsExtractor.getValidationErrors(
      error
    );
    if (!modal.form.externalErrors) {
      this.onError(error);
    }
  }
}
