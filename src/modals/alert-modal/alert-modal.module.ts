import { NgModule, ModuleWithProviders } from '@angular/core';
import { AlertModalComponent } from './alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

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
