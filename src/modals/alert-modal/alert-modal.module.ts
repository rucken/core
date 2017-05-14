import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot()
  ],
  declarations: [AlertModalComponent],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent]
})
export class AlertModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlertModalModule,
      providers: []
    };
  }
}
