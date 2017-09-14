import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterButtonsComponent } from './footer-buttons.component';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, LaddaModule, SharedModule.forRoot()],

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
