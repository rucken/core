import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../../directives/directives.module';
import { FormGroupModule } from '../../../others/form-group/form-group.module';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeModalComponent } from './content-type-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    PromptFormModalModule,
    DirectivesModule
  ],
  declarations: [
    ContentTypeModalComponent
  ],
  entryComponents: [
    ContentTypeModalComponent
  ],
  exports: [
    ContentTypeModalComponent
  ]
})
export class ContentTypeModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeModalModule,
      providers: []
    };
  }
}
