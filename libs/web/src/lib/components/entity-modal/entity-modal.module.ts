import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { PromptFormModalModule } from '../prompt-form-modal/prompt-form-modal.module';
import { EntityModalComponent } from './entity-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule, NgxBindIOModule],
  declarations: [EntityModalComponent],
  entryComponents: [EntityModalComponent],
  exports: [EntityModalComponent, PromptFormModalModule]
})
export class EntityModalModule {}
