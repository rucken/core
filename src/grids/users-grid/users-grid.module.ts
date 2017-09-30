import { NgModule, ModuleWithProviders } from '@angular/core';
import { UsersGridComponent } from './users-grid.component';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserModalModule } from './../../grids/users-grid/user-modal/user-modal.module';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(), GridSearchPanelModule.forRoot(),
    ConfirmModalModule.forRoot(), UserModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    UsersGridComponent
  ],
  exports: [UsersGridComponent],
  entryComponents: [UsersGridComponent]
})
export class UsersGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersGridModule,
      providers: []
    };
  }
}
