import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomesGridComponent } from './fontawesomes-grid.component';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), GridSearchPanelModule.forRoot(), ConfirmModalModule.forRoot(),
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
