import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { GroupsListModalModule } from './../../../grids/groups-grid/groups-list-modal/groups-list-modal.module';
import { GroupSelectInputComponent } from './group-select-input.component';

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
