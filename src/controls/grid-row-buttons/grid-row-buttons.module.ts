import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { GridRowButtonsComponent } from './grid-row-buttons.component';

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
