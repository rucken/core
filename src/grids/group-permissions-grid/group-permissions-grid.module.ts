import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPermissionsGridComponent } from './group-permissions-grid.component';
import { GridSearchPanelModule } from '../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from '../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from '../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { PermissionsListModalModule } from '../../grids/permissions-grid/permissions-list-modal/permissions-list-modal.module';
import { PermissionModalModule } from '../../grids/permissions-grid/permission-modal/permission-modal.module';
import { ConfirmModalModule } from '../../modals/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), GridSearchPanelModule.forRoot(), ConfirmModalModule.forRoot(),
    PermissionModalModule.forRoot(), PermissionsListModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    GroupPermissionsGridComponent
  ],
  exports: [GroupPermissionsGridComponent],
  entryComponents: [GroupPermissionsGridComponent]
})
export class GroupPermissionsGridModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupPermissionsGridModule,
      providers: []
    };
  }
}
