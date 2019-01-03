import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  AuthModalComponent,
  AuthModalService,
  AuthService,
  ErrorsExtractor,
  ModalsService,
  RedirectUrlDto,
  TokenService
} from '@rucken/core';
import { WebAuthModalComponent } from './auth-modal.component';

@Injectable()
export class WebAuthModalService extends AuthModalService {
  componentModal = WebAuthModalComponent;
  signInInfoMessage: string;
  signUpInfoMessage: string;
  signInModalClass = 'modal-md';
  signOutModalClass = 'modal-xs';

  constructor(
    public authService: AuthService,
    public errorsExtractor: ErrorsExtractor,
    public tokenService: TokenService,
    public modalsService: ModalsService,
    public router: Router,
    @Inject(DOCUMENT) public document: any
  ) {
    super(authService, errorsExtractor, tokenService, modalsService);
  }
  onOauthSignInSuccess(modal: AuthModalComponent, data: RedirectUrlDto) {
    super.onOauthSignInSuccess(modal, data);
    this.document.location.href = data.redirect_uri;
  }
  onSignOutSuccess(modal: AuthModalComponent) {
    super.onSignOutSuccess(modal);
    this.router.navigate(['home']);
  }
}
