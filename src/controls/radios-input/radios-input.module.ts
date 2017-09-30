import { NgModule, ModuleWithProviders } from '@angular/core';
import { RadiosInputComponent } from './radios-input.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot()
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
