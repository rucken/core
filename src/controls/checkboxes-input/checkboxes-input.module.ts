import { NgModule, ModuleWithProviders } from '@angular/core';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

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
