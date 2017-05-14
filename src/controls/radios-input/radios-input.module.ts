import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiosInputComponent } from './radios-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild()
  ],
  declarations: [RadiosInputComponent],
  exports: [RadiosInputComponent],
  entryComponents: [RadiosInputComponent]
})
export class RadiosInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadiosInputModule,
      providers: []
    };
  }
}
