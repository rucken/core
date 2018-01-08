import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FooterButtonsComponent } from './footer-buttons.component';

@NgModule({
  imports: [
    SharedModule.forRoot()
  ],

  declarations: [FooterButtonsComponent],
  exports: [FooterButtonsComponent],
  entryComponents: [FooterButtonsComponent]
})
export class FooterButtonsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FooterButtonsModule,
      providers: []
    };
  }
}
