import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule.forRoot()
  ],
  declarations: [CheckboxesInputComponent],
  exports: [CheckboxesInputComponent],
  entryComponents: [CheckboxesInputComponent]
})
export class CheckboxesInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckboxesInputModule,
      providers: []
    };
  }
}
