import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { TextInputConfig } from './text-input.config';
import { TextMaskModule } from 'angular2-text-mask';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(),
    TextMaskModule, TooltipModule.forRoot()
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
