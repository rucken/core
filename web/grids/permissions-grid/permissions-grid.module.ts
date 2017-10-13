import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { PermissionsGridComponent } from './permissions-grid.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), GridSearchPanelModule.forRoot(), ConfirmModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],

  declarations: [
    PermissionsGridComponent
  ],
  exports: [PermissionsGridComponent],
  entryComponents: [PermissionsGridComponent]
})
export class PermissionsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsGridModule,
      providers: []
    };
  }
}
