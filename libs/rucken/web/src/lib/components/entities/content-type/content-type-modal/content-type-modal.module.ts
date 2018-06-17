import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeModalComponent } from './content-type-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule
  ],
  declarations: [
    ContentTypeModalComponent
  ],
  entryComponents: [
    ContentTypeModalComponent
  ],
  exports: [
    ContentTypeModalComponent,
    PromptFormModalModule
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
