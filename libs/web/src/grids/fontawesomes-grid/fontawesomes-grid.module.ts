import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { FontawesomesGridComponent } from './fontawesomes-grid.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), GridSearchPanelModule.forRoot(), ConfirmModalModule.forRoot(),
    PipesModule.forRoot(), TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    FontawesomesGridComponent
  ],
  exports: [FontawesomesGridComponent],
  entryComponents: [FontawesomesGridComponent]
})
export class FontawesomesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomesGridModule,
      providers: []
    };
  }
}
