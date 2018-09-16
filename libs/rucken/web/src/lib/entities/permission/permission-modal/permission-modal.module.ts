import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PromptFormModalModule } from '../../../components/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeInputModule } from '../../content-type/content-type-input/content-type-input.module';
import { ContentTypeSelectModule } from '../../content-type/content-type-select/content-type-select.module';
import { PermissionModalComponent } from './permission-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    ContentTypeInputModule,
    ContentTypeSelectModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [PermissionModalComponent],
  entryComponents: [PermissionModalComponent],
  exports: [
    PermissionModalComponent,
    PromptFormModalModule,
    ContentTypeInputModule,
    ContentTypeSelectModule
  ]
})
export class PermissionModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionModalModule,
      providers: []
    };
  }
}
