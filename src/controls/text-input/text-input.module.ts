import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { DatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TextInputComponent } from './text-input.component';
import { TextInputConfig } from './text-input.config';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(), DatepickerModule.forRoot(),
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
