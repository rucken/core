import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../../directives/directives.module';
import { FormGroupModule } from '../../../others/form-group/form-group.module';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { UserGroupsGridModule } from '../user-groups-grid/user-groups-grid.module';
import { UserModalComponent } from './user-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PipesModule } from '../../../../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule.forRoot(),
    BsDatepickerModule,
    UserGroupsGridModule.forRoot(),
    DirectivesModule.forRoot(),
    PipesModule.forRoot(),
    PromptFormModalModule.forRoot()
  ],
  declarations: [
    UserModalComponent
  ],
  entryComponents: [
    UserModalComponent
  ],
  exports: [
    UserModalComponent
  ]
})
export class UserModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModalModule,
      providers: []
    };
  }
}
