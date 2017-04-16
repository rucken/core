import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiosInputComponent } from './radios-input.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule.forRoot()
  ],
  declarations: [RadiosInputComponent],
  exports: [RadiosInputComponent],
  entryComponents: [RadiosInputComponent]
})
export class RadiosInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadiosInputModule,
      providers: []
    };
  }
}
