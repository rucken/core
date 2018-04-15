import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../../directives/directives.module';
import { FormGroupModule } from '../../../others/form-group/form-group.module';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { GroupPermissionsGridModule } from '../group-permissions-grid/group-permissions-grid.module';
import { GroupModalComponent } from './group-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    PromptFormModalModule,
    DirectivesModule,
    GroupPermissionsGridModule
  ],
  declarations: [
    GroupModalComponent
  ],
  entryComponents: [
    GroupModalComponent
  ],
  exports: [
    GroupModalComponent
  ]
})
export class GroupModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModalModule,
      providers: []
    };
  }
}
