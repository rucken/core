import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DirectivesModule } from '../../../../directives/directives.module';
import { FormGroupModule } from '../../../others/form-group/form-group.module';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { ContentTypeInputModule } from '../../content-type/content-type-input/content-type-input.module';
import { ContentTypeSelectModule } from '../../content-type/content-type-select/content-type-select.module';
import { PermissionModalComponent } from './permission-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    PromptFormModalModule,
    ContentTypeInputModule,
    ContentTypeSelectModule,
    DirectivesModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    PermissionModalComponent
  ],
  entryComponents: [
    PermissionModalComponent
  ],
  exports: [
    PermissionModalComponent
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
