import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../controls/text-input/text-input.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [AuthModalComponent],
  exports: [AuthModalComponent],
  entryComponents: [AuthModalComponent]
})
export class AuthModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModalModule,
      providers: []
    };
  }
}
