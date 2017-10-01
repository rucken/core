import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { TableColumnComponent } from './table-column.component';
import { TableColumnConfig } from './table-column.config';

@NgModule({
  imports: [SharedModule.forRoot()],
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
