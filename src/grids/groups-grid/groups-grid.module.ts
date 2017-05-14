import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsGridComponent } from './groups-grid.component';
import { GridSearchPanelModule } from '../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from '../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from '../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { GroupModalModule } from '../../grids/groups-grid/group-modal/group-modal.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), GridSearchPanelModule.forRoot(),
    GroupModalModule.forRoot(), ConfirmModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    GroupsGridComponent
  ],
  exports: [GroupsGridComponent],
  entryComponents: [GroupsGridComponent]
})
export class GroupsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsGridModule,
      providers: []
    };
  }
}
