import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DirectivesModule } from '../../../../directives/directives.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { FormGroupModule } from '../../../others/form-group/form-group.module';
import { UserGroupsGridModule } from '../user-groups-grid/user-groups-grid.module';
import { ProfilePanelComponent } from './profile-panel.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    BsDatepickerModule,
    UserGroupsGridModule,
    DirectivesModule,
    PipesModule
  ],
  declarations: [
    ProfilePanelComponent
  ],
  exports: [
    ProfilePanelComponent
  ]
})
export class ProfilePanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfilePanelModule,
      providers: []
    };
  }
}
