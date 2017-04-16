import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeModalComponent } from './fontawesome-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [
    FontawesomeModalComponent
    ],
  exports: [FontawesomeModalComponent],
  entryComponents: [FontawesomeModalComponent]
})
export class FontawesomeModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomeModalModule,
      providers: []
    };
  }
}
