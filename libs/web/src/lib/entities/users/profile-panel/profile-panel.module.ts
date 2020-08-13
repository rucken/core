import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
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
    PipesModule,
    FontAwesomeModule,
    NgxBindIOModule
  ],
  declarations: [ProfilePanelComponent],
  exports: [ProfilePanelComponent]
})
export class ProfilePanelModule {}
