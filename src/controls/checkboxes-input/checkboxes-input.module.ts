import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesInputComponent } from './checkboxes-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild()
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
