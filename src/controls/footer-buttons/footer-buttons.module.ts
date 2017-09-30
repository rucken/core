import { NgModule, ModuleWithProviders } from '@angular/core';
import { FooterButtonsComponent } from './footer-buttons.component';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [LaddaModule, SharedModule.forRoot()],

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
