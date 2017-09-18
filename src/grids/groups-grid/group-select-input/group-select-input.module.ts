import { NgModule, ModuleWithProviders } from '@angular/core';
import { GroupSelectInputComponent } from './group-select-input.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { GroupsListModalModule } from './../../../grids/groups-grid/groups-list-modal/groups-list-modal.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(),
    GroupsListModalModule.forRoot(),
    SelectInputModule.forRoot()
  ],
  declarations: [
    GroupSelectInputComponent
  ],
  exports: [GroupSelectInputComponent],
  entryComponents: [GroupSelectInputComponent]
})
export class GroupSelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupSelectInputModule,
      providers: []
    };
  }
}
