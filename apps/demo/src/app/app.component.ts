import { isPlatformBrowser } from '@angular/common';
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
  UserTokenDto
} from '@rucken/core';
import { AuthModalComponent, MessageModalService } from '@rucken/web';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppRoutes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  public title = 'Rucken: Demo';
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
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if (isPlatformBrowser(this._platformId)) {
      this.langService.current$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(lang => {
          this._bsLocaleService.use(lang);
        });
      this._tokenService.tokenHasExpired$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(result => {
          if (result === true) {
            this.onInfo();
          }
        });
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
              .logout()
              .subscribe(data => this.onLogoutSuccess(undefined))
          );
      } else {
        if (!this.authService.current) {
          this.authService.info(token).subscribe(
            data => this.onLoginOrInfoSuccess(undefined, data),
            error => {
              if (this._errorsExtractor.getErrorMessage(error)) {
                this.onError(error);
              }
              this.authService
                .logout()
                .subscribe(data => this.onLogoutSuccess(undefined));
            }
          );
        }
      }
    }
  }
  onLogout() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this._translateService.instant('Logout'),
        message: this._translateService.instant('Do you really want to leave?'),
        yesTitle: this._translateService.instant('Yes'),
        noTitle: this._translateService.instant('No')
      }
    });
    bsModalRef.content.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this.authService.logout().subscribe(data => this.onLogoutSuccess(modal));
    });
  }
  onLogin() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-sm',
      initialState: {
        title: this._translateService.instant('Authorization'),
        yesTitle: this._translateService.instant('Sign in'),
        data: {},
        checkIsDirty: true
      }
    });
    bsModalRef.content.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this.authService
        .login(modal.data.email, modal.data.password)
        .subscribe(
          data => this.onLoginOrInfoSuccess(modal, data),
          error => this.onLoginError(modal, error)
        );
    });
  }
  onLoginOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
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
  onLogoutSuccess(modal: AuthModalComponent) {
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
  onLoginError(modal: AuthModalComponent, error: any) {
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
