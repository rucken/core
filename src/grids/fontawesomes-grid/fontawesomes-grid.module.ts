import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomesGridComponent } from './fontawesomes-grid.component';
import { GridSearchPanelModule } from '../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from '../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from '../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule.forRoot(), GridSearchPanelModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    FontawesomesGridComponent
  ],
  exports: [FontawesomesGridComponent],
  entryComponents: [FontawesomesGridComponent]
})
export class FontawesomesGridModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomesGridModule,
      providers: []
    };
  }
}
