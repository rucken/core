import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputComponent } from './select-input.component';
import { SelectInputConfig } from './select-input.config';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(), PipesModule.forRoot(),
    NguiAutoCompleteModule
  ],

  declarations: [SelectInputComponent],
  exports: [SelectInputComponent],
  entryComponents: [SelectInputComponent]
})
export class SelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectInputModule,
      providers: [SelectInputConfig]
    };
  }
}
