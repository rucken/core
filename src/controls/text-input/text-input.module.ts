import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { TextMaskModule } from 'angular2-text-mask';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { TextInputComponent } from './text-input.component';
import { TextInputConfig } from './text-input.config';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), DatepickerModule.forRoot(),
    PipesModule.forRoot(), TextMaskModule, TooltipModule.forRoot()
  ],

  declarations: [TextInputComponent],
  exports: [TextInputComponent],
  entryComponents: [TextInputComponent]
})
export class TextInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TextInputModule,
      providers: [TextInputConfig]
    };
  }
}
