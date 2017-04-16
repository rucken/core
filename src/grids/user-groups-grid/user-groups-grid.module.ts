import { PaginationModule } from 'ng2-bootstrap/pagination';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsGridComponent } from './user-groups-grid.component';
import { TableColumnModule } from '../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from '../../controls/grid-row-buttons/grid-row-buttons.module';
import { GridSearchPanelModule } from '../../controls/grid-search-panel/grid-search-panel.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule.forRoot(), GridSearchPanelModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    UserGroupsGridComponent
  ],
  exports: [UserGroupsGridComponent],
  entryComponents: [UserGroupsGridComponent]
})
export class UserGroupsGridModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserGroupsGridModule,
      providers: []
    };
  }
}
