import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PipesModule } from '../../pipes/pipes.module';
import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { AlertModalComponent } from './alert-modal.component';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), PipesModule.forRoot()
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
