import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthModalComponent,
  AuthModalService,
  AuthService,
  LangService,
  RedirectUrlDto,
  TokenService,
  User,
  UserTokenDto
} from '@rucken/core';
import { NavbarComponent } from '@rucken/web';
import { BindIoInner } from 'ngx-bind-io';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APP_ROUTES } from './app.routes';
import { config } from './config/config';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);
@BindIoInner()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('navbar')
  navbar: NavbarComponent;
  public title: string;
  public currentUser$: Observable<User>;
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
    this._authModalService.signInInfoMessage = config.authModal.signInInfoMessage;
    this._authModalService.signUpInfoMessage = config.authModal.signUpInfoMessage;
    this.currentUser$ = this._authService.current$;
    this._langService.current$.pipe(takeUntil(this._destroyed$)).subscribe(lang => {
      if (lang) {
        this._bsLocaleService.use(lang);
        this._metaService.setTag('og:locale', lang.toLowerCase() + '-' + lang.toUpperCase());
        this.title = this._translateService.instant(this._metaService.loader.settings.applicationName);
      }
    });
    this._tokenService.tokenHasExpired$.pipe(takeUntil(this._destroyed$)).subscribe(result => {
      if (result === true) {
        if (isPlatformBrowser(this._platformId)) {
          this._authModalService.onTokenError();
        } else {
          this._authModalService.onSignOutSuccess(undefined);
        }
      }
    });
  }
  ngOnInit() {
    this._authModalService.onInfo();
    this.navbar.setRoutes(APP_ROUTES);
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
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
