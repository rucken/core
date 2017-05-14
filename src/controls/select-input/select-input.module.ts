import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputComponent } from './select-input.component';
import { SelectInputConfig } from './select-input.config';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(), TooltipModule.forRoot(),
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
