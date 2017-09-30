import { NgModule, ModuleWithProviders } from '@angular/core';
import { ContentTypesGridComponent } from './content-types-grid.component';
import { GridSearchPanelModule } from './../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from './../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from './../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ContentTypeModalModule } from './../../grids/content-types-grid/content-type-modal/content-type-modal.module';
import { ConfirmModalModule } from './../..//modals/confirm-modal/confirm-modal.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(), GridSearchPanelModule.forRoot(),
    ContentTypeModalModule.forRoot(), ConfirmModalModule.forRoot(),
    TableColumnModule.forRoot(), GridRowButtonsModule.forRoot(), PaginationModule.forRoot()
  ],
  declarations: [
    ContentTypesGridComponent
  ],
  exports: [ContentTypesGridComponent],
  entryComponents: [ContentTypesGridComponent]
})
export class ContentTypesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesGridModule,
      providers: []
    };
  }
}
