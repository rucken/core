import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypesGridComponent } from './content-types-grid.component';
import { GridSearchPanelModule } from '../../controls/grid-search-panel/grid-search-panel.module';
import { TableColumnModule } from '../../controls/table-column/table-column.module';
import { GridRowButtonsModule } from '../../controls/grid-row-buttons/grid-row-buttons.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { ContentTypeModalModule } from '../../grids/content-types-grid/content-type-modal/content-type-modal.module';
import { ConfirmModalModule } from '../..//modals/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), GridSearchPanelModule.forRoot(),
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
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesGridModule,
      providers: []
    };
  }
}
