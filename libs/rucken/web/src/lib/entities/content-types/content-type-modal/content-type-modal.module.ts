import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { PromptFormModalModule } from '../../../components/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeModalComponent } from './content-type-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule, NgxBindIOModule],
  declarations: [ContentTypeModalComponent],
  entryComponents: [ContentTypeModalComponent],
  exports: [ContentTypeModalComponent, PromptFormModalModule]
})
export class ContentTypeModalModule {}
