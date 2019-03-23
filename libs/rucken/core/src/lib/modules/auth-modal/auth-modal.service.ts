import { Injectable, isDevMode, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorsExtractor } from '../../utils/errors-extractor';
import { translate } from '../../utils/translate';
import { RedirectUrlDto } from '../auth/dto/redirect-url.dto';
import { UserTokenDto } from '../auth/dto/user-token.dto';
import { AuthService } from '../auth/services/auth.service';
import { TokenService } from '../auth/services/token.service';
import { ModalsService } from '../modals/modals.service';
import { AuthModalTypeEnum } from './auth-modal-type.enum';
import { AuthModalComponent } from './auth-modal.component';

@Injectable()
export class AuthModalService implements OnDestroy {
  componentModal: string | TemplateRef<any> | any;
  signInInfoMessage: string | { text: string; data: { [key: string]: string } };
  signUpInfoMessage: string | { text: string; data: { [key: string]: string } };
  signInModalClass: string;
  signOutModalClass: string;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public authService: AuthService,
    public errorsExtractor: ErrorsExtractor,
    public tokenService: TokenService,
    public modalsService: ModalsService
  ) {}
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onTokenError(message?: string) {
    this.modalsService
      .errorAsync({
        error: !message || message === 'jwt expired' ? translate('Your session has expired, please re-login') : message,
        onTop: true
      })
      .then(result =>
        this.authService
          .signOut()
          .pipe(takeUntil(this._destroyed$))
          .subscribe(data => this.onSignOutSuccess(undefined))
      );
  }
  onInfo() {
    if (!this.authService.getCurrent()) {
      const token = this.tokenService.getCurrent();
      if (token) {
        this.authService
          .info(token)
          .pipe(takeUntil(this._destroyed$))
          .subscribe(
            data => this.onSignInOrInfoSuccess(undefined, data),
            error => this.onTokenError(this.errorsExtractor.getErrorMessage(error))
          );
      }
    }
  }
  onSignOut() {
    this.onSignOutAsync().then();
  }
  async onSignOutAsync() {
    const modalRef = await this.modalsService.createAsync<AuthModalComponent>(this.componentModal, {
      class: this.signOutModalClass,
      initialState: {
        type: AuthModalTypeEnum.SignOut,
        noTitle: translate('No')
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this.authService
        .signOut()
        .pipe(takeUntil(this._destroyed$))
        .subscribe(data => this.onSignOutSuccess(modal));
    });
  }
  onSignIn() {
    this.onSignInAsync().then();
  }
  async onSignInAsync() {
    const modalRef = await this.modalsService.createAsync<AuthModalComponent>(this.componentModal, {
      class: this.signInModalClass,
      initialState: {
        type: AuthModalTypeEnum.SignIn,
        data: {},
        signInInfoMessage: this.signInInfoMessage,
        signUpInfoMessage: this.signUpInfoMessage
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      if (typeof modal.yesData === 'string') {
        this.authService
          .oauthRedirectUrl(modal.yesData)
          .subscribe(data => this.onOauthSignInSuccess(modal, data), error => this.onSignInError(modal, error));
      } else {
        const data = modal.getData();
        if (modal.type === AuthModalTypeEnum.SignIn) {
          this.authService
            .signIn(data.email, data.password)
            .subscribe(result => this.onSignInOrInfoSuccess(modal, result), error => this.onSignInError(modal, error));
        }
        if (modal.type === AuthModalTypeEnum.SignUp) {
          this.authService
            .signUp(data.email, data.password, data.username)
            .subscribe(result => this.onSignInOrInfoSuccess(modal, result), error => this.onSignInError(modal, error));
        }
      }
    });
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUrlDto) {
    if (modal) {
      modal.processing = false;
    }
    if (modal) {
      modal.hide();
    }
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    if (modal) {
      modal.processing = false;
    }
    if (data.token) {
      this.tokenService.setCurrent(data.token);
    }
    this.authService.setCurrent(data.user);
    if (modal) {
      modal.hide();
    }
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    if (modal) {
      modal.processing = false;
    }
    this.tokenService.setCurrent(undefined);
    this.authService.setCurrent(undefined);
    if (modal) {
      modal.hide();
    }
  }
  onError(error: any) {
    this.modalsService.error({
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
    if (this.errorsExtractor) {
      const externalErrors = this.errorsExtractor.getValidationErrors(error);
      modal.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
}
