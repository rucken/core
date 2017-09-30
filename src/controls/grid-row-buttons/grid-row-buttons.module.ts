import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { GridRowButtonsComponent } from './grid-row-buttons.component';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(), TooltipModule.forRoot()
  ],

  declarations: [GridRowButtonsComponent],
  exports: [GridRowButtonsComponent],
  entryComponents: [GridRowButtonsComponent]
})
export class GridRowButtonsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GridRowButtonsModule,
      providers: []
    };
  }
}
