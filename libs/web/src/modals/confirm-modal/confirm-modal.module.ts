import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared/shared.module';
import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { ConfirmModalComponent } from './confirm-modal.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), PipesModule.forRoot()
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
