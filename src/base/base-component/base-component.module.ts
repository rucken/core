import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseComponent],
  exports: [BaseComponent],
  entryComponents: [BaseComponent]
})
export class BaseComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseComponentModule,
      providers: []
    };
  }
}
