import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridRowButtonsComponent } from './grid-row-buttons.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule.forRoot(), TooltipModule.forRoot()
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
