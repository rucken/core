import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormGroupModule } from '../../../components/form-group/form-group.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { MessageModalModule } from '../../../modals/message-modal/message-modal.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { UserGroupsGridModule } from '../user-groups-grid/user-groups-grid.module';
import { ProfilePanelComponent } from './profile-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MessageModalModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    BsDatepickerModule,
    UserGroupsGridModule,
    DirectivesModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [ProfilePanelComponent],
  exports: [ProfilePanelComponent]
})
export class ProfilePanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfilePanelModule,
      providers: []
    };
  }
}
