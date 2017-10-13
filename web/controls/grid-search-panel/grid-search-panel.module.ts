import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { GridSearchPanelComponent } from './grid-search-panel.component';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot()
  ],

  declarations: [GridSearchPanelComponent],
  exports: [GridSearchPanelComponent],
  entryComponents: [GridSearchPanelComponent]
})
export class GridSearchPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GridSearchPanelModule,
      providers: []
    };
  }
}
