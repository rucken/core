import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridSearchPanelComponent } from './grid-search-panel.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild()
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
