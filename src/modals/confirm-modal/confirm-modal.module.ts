import { NgModule, ModuleWithProviders } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot()
  ],
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class ConfirmModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfirmModalModule,
      providers: []
    };
  }
}
