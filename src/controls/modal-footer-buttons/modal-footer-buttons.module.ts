import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFooterButtonsComponent } from './modal-footer-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [CommonModule, LaddaModule, TranslateModule.forChild()],
  declarations: [ModalFooterButtonsComponent],
  exports: [ModalFooterButtonsComponent],
  entryComponents: [ModalFooterButtonsComponent]
})
export class ModalFooterButtonsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalFooterButtonsModule,
      providers: []
    };
  }
}
