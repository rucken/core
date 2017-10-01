import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';

import { CheckboxesInputComponent } from './checkboxes-input.component';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot()
  ],
  declarations: [CheckboxesInputComponent],
  exports: [CheckboxesInputComponent],
  entryComponents: [CheckboxesInputComponent]
})
export class CheckboxesInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckboxesInputModule,
      providers: []
    };
  }
}
