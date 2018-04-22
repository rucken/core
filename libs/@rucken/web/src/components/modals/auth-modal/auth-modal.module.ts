import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '../../others/prompt-form-modal/prompt-form-modal.module';
import { AuthModalComponent } from './auth-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule
  ],
  declarations: [
    AuthModalComponent
  ],
  entryComponents: [
    AuthModalComponent
  ],
  exports: [
    AuthModalComponent,
    PromptFormModalModule
  ]
})
export class AuthModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModalModule,
      providers: []
    };
  }
}
