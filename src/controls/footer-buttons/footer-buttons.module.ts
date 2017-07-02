import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterButtonsComponent } from './footer-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [CommonModule, LaddaModule, TranslateModule.forChild()],
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
