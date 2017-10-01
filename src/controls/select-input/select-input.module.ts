import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { SharedModule } from '@rucken/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SelectInputComponent } from './select-input.component';
import { SelectInputConfig } from './select-input.config';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(), PipesModule.forRoot(),
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
