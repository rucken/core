import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { ModalsModule } from '../modals/modals.module';
import { AUTH_MODAL_CONFIG_TOKEN, DEFAULT_AUTH_MODAL_CONFIG } from './auth-modal.config';
import { IAuthModalConfig } from './interfaces/auth-modal-config.interface';
@NgModule({
  imports: [CommonModule, ModalsModule, AuthModule, TranslateModule.forChild()]
})
export class AuthModalModule {
  static forRoot(options?: IAuthModalConfig): ModuleWithProviders {
    return {
      ngModule: AuthModalModule,
      providers: [
        {
          provide: AUTH_MODAL_CONFIG_TOKEN,
          useValue: {
            oauth: options.oauth ? options.oauth : DEFAULT_AUTH_MODAL_CONFIG.oauth
          }
        }
      ]
    };
  }
}
