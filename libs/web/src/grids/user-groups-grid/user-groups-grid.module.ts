import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { GroupModalModule } from './../../grids/groups-grid/group-modal/group-modal.module';
import { GroupsListModalModule } from './../../grids/groups-grid/groups-list-modal/groups-list-modal.module';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { UserGroupsGridComponent } from './user-groups-grid.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), GridSearchPanelModule.forRoot(),
    GroupsListModalModule.forRoot(), GroupModalModule.forRoot(), ConfirmModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    UserGroupsGridComponent
  ],
  exports: [UserGroupsGridComponent],
  entryComponents: [UserGroupsGridComponent]
})
export class UserGroupsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserGroupsGridModule,
      providers: []
    };
  }
}
