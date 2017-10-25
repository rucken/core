import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TableColumnComponent } from './table-column.component';

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
      providers: []
    };
  }
}
