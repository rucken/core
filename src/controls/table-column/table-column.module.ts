import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnComponent } from './table-column.component';
import { TableColumnConfig } from './table-column.config';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule.forRoot()],
  declarations: [TableColumnComponent],
  exports: [TableColumnComponent],
  entryComponents: [TableColumnComponent]
})
export class TableColumnModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TableColumnModule,
      providers: [TableColumnConfig]
    };
  }
}
