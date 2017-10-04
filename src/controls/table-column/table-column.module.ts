import { ModuleWithProviders, NgModule } from '@angular/core';

import { TableColumnComponent } from './table-column.component';
import { TableColumnConfig } from './table-column.config';
import { SharedModule } from '../../shared/shared.module';

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
