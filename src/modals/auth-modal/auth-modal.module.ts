import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthModalComponent } from './auth-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../controls/text-input/text-input.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [AuthModalComponent],
  exports: [AuthModalComponent],
  entryComponents: [AuthModalComponent]
})
export class AuthModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModalModule,
      providers: []
    };
  }
}
