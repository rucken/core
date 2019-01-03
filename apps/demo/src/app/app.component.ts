import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthModalComponent,
  AuthModalService,
  AuthService,
  ILanguagesItem,
  LangService,
  RedirectUrlDto,
  TokenService,
  User,
  UserTokenDto
} from '@rucken/core';
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
    private _tokenService: TokenService,
    private _translateService: TranslateService,
    private _bsLocaleService: BsLocaleService,
    private _metaService: MetaService,
    private _authModalService: AuthModalService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this._authModalService.signInInfoMessage = AuthModalSignInInfoMessage;
    this._authModalService.signUpInfoMessage = AuthModalSignUpInfoMessage;
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
    this._authModalService.onInfo();
  }
  onSignOut() {
    this._authModalService.onSignOut();
  }
  onSignIn() {
    this._authModalService.onSignIn();
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUrlDto) {
    this._authModalService.onOauthSignInSuccess(modal, data);
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    this._authModalService.onSignInOrInfoSuccess(modal, data);
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    this._authModalService.onSignOutSuccess(modal);
  }
  onError(error: any) {
    this._authModalService.onError(error);
  }
  onSignInError(modal: AuthModalComponent, error: any) {
    this._authModalService.onSignInError(modal, error);
  }
}
