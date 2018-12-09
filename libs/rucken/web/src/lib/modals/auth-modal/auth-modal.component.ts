import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BasePromptFormModalComponent, translate } from '@rucken/core';
import { BehaviorSubject } from 'rxjs';
import { AuthModalTypeEnum } from './auth-modal-type.enum';
import { AUTH_MODAL_CONFIG_TOKEN } from './auth-modal.config';
import { AuthModalModel } from './auth-modal.model';
import { IAuthModalConfig } from './interfaces/auth-modal-config.interface';
import { IAuthModalOauthProvider } from './interfaces/auth-modal-oauth-provider.interface';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent extends BasePromptFormModalComponent<AuthModalModel> implements OnInit {
  @Input()
  type: AuthModalTypeEnum;
  @Input()
  signInYesTitle = translate('Sign in');
  @Input()
  signInTitle = translate('Authorization');
  @Input()
  signUpYesTitle = translate('Sign up');
  @Input()
  signUpTitle = translate('Registration');
  @Input()
  signOutYesTitle = translate('Yes');
  @Input()
  signOutTitle = translate('Sign out');
  @Input()
  signOutMesage = translate('Do you really want to leave?');

  signInInfoMessage: string;
  signUpInfoMessage: string;

  extTitle: string;
  oauthProviders$ = new BehaviorSubject<IAuthModalOauthProvider[]>([]);

  signInType = AuthModalTypeEnum.SignIn;
  signUpType = AuthModalTypeEnum.SignUp;
  signOutType = AuthModalTypeEnum.SignOut;

  constructor(@Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig) {
    super();
    this.initSignIn();
    this.oauthProviders$.next(this._authModalConfig.oauth.providers);
  }
  ngOnInit() {
    if (this.type === AuthModalTypeEnum.SignIn) {
      this.initSignIn();
    }
    if (this.type === AuthModalTypeEnum.SignUp) {
      this.initSignUp();
    }
    if (this.type === AuthModalTypeEnum.SignOut) {
      this.initSignOut();
    }
  }
  onOauthYesClick(oauthProvider: IAuthModalOauthProvider) {
    this.initSignInOauth();
    this.onYesClick(oauthProvider.name);
  }
  onExtClick(event?: any) {
    if (this.type === AuthModalTypeEnum.SignIn) {
      this.initSignUp();
    } else {
      this.initSignIn();
    }
  }
  initSignInOauth() {
    this.checkIsDirty = false;
    this.validateForm = false;
  }
  initSignUp() {
    this.checkIsDirty = false;
    this.type = AuthModalTypeEnum.SignUp;
    this.title = this.signUpTitle;
    this.yesTitle = this.signUpYesTitle;
    this.message = undefined;
    this.extTitle = this.signInYesTitle;
    this.group(AuthModalModel, undefined, {
      customValidatorOptions: {
        groups: [this.type.toString()]
      }
    });
  }
  initSignIn() {
    this.checkIsDirty = false;
    this.type = AuthModalTypeEnum.SignIn;
    this.title = this.signInTitle;
    this.yesTitle = this.signInYesTitle;
    this.message = undefined;
    this.extTitle = this.signUpYesTitle;
    this.group(
      AuthModalModel,
      {
        email: '',
        password: ''
      },
      {
        customValidatorOptions: {
          groups: [this.type.toString()]
        }
      }
    );
  }
  initSignOut() {
    this.checkIsDirty = false;
    this.validateForm = false;
    this.type = AuthModalTypeEnum.SignOut;
    this.title = this.signOutTitle;
    this.yesTitle = this.signOutYesTitle;
    this.message = this.signOutMesage;
  }
}
