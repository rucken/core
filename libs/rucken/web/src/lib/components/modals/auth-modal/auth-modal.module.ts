import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '../../others/prompt-form-modal/prompt-form-modal.module';
import { AuthModalComponent } from './auth-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IAuthModalConfig } from './interfaces/auth-modal-config.interface';
import {
  AUTH_MODAL_CONFIG_TOKEN,
  defaultAuthModalConfig
} from './auth-modal.config';
@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    TranslateModule.forChild(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  declarations: [AuthModalComponent],
  entryComponents: [AuthModalComponent],
  exports: [AuthModalComponent, PromptFormModalModule]
})
export class AuthModalModule {
  static forRoot(options?: IAuthModalConfig): ModuleWithProviders {
    return {
      ngModule: AuthModalModule,
      providers: [
        {
          provide: AUTH_MODAL_CONFIG_TOKEN,
          useValue: {
            oauth: options.oauth ? options.oauth : defaultAuthModalConfig.oauth
          }
        }
      ]
    };
  }
}
