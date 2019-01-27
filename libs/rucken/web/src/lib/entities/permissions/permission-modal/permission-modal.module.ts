import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PromptFormModalModule } from '../../../components/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeInputModule } from '../../content-types/content-type-input/content-type-input.module';
import { ContentTypeSelectModule } from '../../content-types/content-type-select/content-type-select.module';
import { PermissionModalComponent } from './permission-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    ContentTypeInputModule,
    ContentTypeSelectModule,
    TypeaheadModule.forRoot(),
    NgxBindIOModule
  ],
  declarations: [PermissionModalComponent],
  entryComponents: [PermissionModalComponent],
  exports: [PermissionModalComponent, PromptFormModalModule, ContentTypeInputModule, ContentTypeSelectModule]
})
export class PermissionModalModule {}
