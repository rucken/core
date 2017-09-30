import { NgModule, ModuleWithProviders } from '@angular/core';
import { GridSearchPanelComponent } from './grid-search-panel.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';

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
