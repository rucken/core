import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

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
