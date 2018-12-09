import { Injectable, isDevMode, TemplateRef } from '@angular/core';
import { ErrorsExtractor } from '../../utils/errors-extractor';
import { translate } from '../../utils/translate';
import { RedirectUriDto } from '../auth/dto/redirect-uri.dto';
import { UserTokenDto } from '../auth/dto/user-token.dto';
import { AuthService } from '../auth/services/auth.service';
import { TokenService } from '../auth/services/token.service';
import { ModalsService } from '../modals/modals.service';
import { AuthModalTypeEnum } from './auth-modal-type.enum';
import { AuthModalComponent } from './auth-modal.component';

@Injectable()
export class AuthModalService {
  componentModal: string | TemplateRef<any> | any;
  signInInfoMessage: string;
  signUpInfoMessage: string;

  constructor(
    public authService: AuthService,
    public errorsExtractor: ErrorsExtractor,
    public tokenService: TokenService,
    public modalsService: ModalsService
  ) {}
  onInfo() {
    const token = this.tokenService.current;
    if (token) {
      if (this.tokenService.tokenHasExpired(token)) {
        this.tokenService.stopCheckTokenHasExpired();
        this.modalsService
          .errorAsync({
            error: translate('Your session has expired, please re-login'),
            class: 'modal-md',
            onTop: true
          })
          .then(result => this.authService.signOut().subscribe(data => this.onSignOutSuccess(undefined)));
      } else {
        if (!this.authService.current) {
          this.authService.info(token).subscribe(
            data => this.onSignInOrInfoSuccess(undefined, data),
            error => {
              if (this.errorsExtractor.getErrorMessage(error)) {
                this.onError(error);
              }
              this.authService.signOut().subscribe(data => this.onSignOutSuccess(undefined));
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
    const modalRef = await this.modalsService.createAsync<AuthModalComponent>(this.componentModal, {
      class: 'modal-md',
      initialState: {
        type: AuthModalTypeEnum.SignOut,
        noTitle: translate('No')
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      this.authService.signOut().subscribe(data => this.onSignOutSuccess(modal));
    });
  }
  onSignIn() {
    this.onSignInAsync().then();
  }
  async onSignInAsync() {
    const modalRef = await this.modalsService.createAsync<AuthModalComponent>(this.componentModal, {
      class: 'modal-xs',
      initialState: {
        type: AuthModalTypeEnum.SignIn,
        data: {},
        signInInfoMessage: this.signInInfoMessage,
        signUpInfoMessage: this.signUpInfoMessage
      }
    });
    modalRef.instance.yes.subscribe((modal: AuthModalComponent) => {
      modal.processing = true;
      if (modal.yesData) {
        this.authService
          .oauthRedirectUri(modal.yesData)
          .subscribe(data => this.onOauthSignInSuccess(modal, data), error => this.onSignInError(modal, error));
      } else {
        if (modal.type === AuthModalTypeEnum.SignIn) {
          this.authService
            .signIn(modal.data.email, modal.data.password)
            .subscribe(data => this.onSignInOrInfoSuccess(modal, data), error => this.onSignInError(modal, error));
        }
        if (modal.type === AuthModalTypeEnum.SignUp) {
          this.authService
            .signUp(modal.data.email, modal.data.password, modal.data.username)
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
  }
  onSignInOrInfoSuccess(modal: AuthModalComponent, data: UserTokenDto) {
    if (modal) {
      modal.processing = false;
    }
    if (data.token) {
      this.tokenService.current = data.token;
    }
    this.authService.current = data.user;
    if (modal) {
      modal.hide();
    }
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    if (modal) {
      modal.processing = false;
    }
    this.tokenService.current = undefined;
    this.authService.current = undefined;
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
    modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
    if (!modal.form.externalErrors) {
      this.onError(error);
    }
  }
}
