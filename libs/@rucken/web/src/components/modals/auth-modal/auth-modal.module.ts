import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormGroupModule } from '../../others/form-group/form-group.module';
import { PromptFormModalModule } from '../../others/prompt-form-modal/prompt-form-modal.module';
import { AuthModalComponent } from './auth-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule.forRoot(),
    PromptFormModalModule.forRoot(),
    DirectivesModule.forRoot()
  ],
  declarations: [
    AuthModalComponent
  ],
  entryComponents: [
    AuthModalComponent
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
