import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule.forRoot(),
    TooltipModule.forRoot(),
    PipesModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [SelectInputComponent],
  exports: [SelectInputComponent],
  entryComponents: [SelectInputComponent]
})
export class SelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectInputModule,
      providers: []
    };
  }
}
