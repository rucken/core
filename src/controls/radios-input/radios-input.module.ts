import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RadiosInputComponent } from './radios-input.component';
import { SharedModule } from '../../shared/shared.module';

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
