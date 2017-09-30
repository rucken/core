import { NgModule, ModuleWithProviders } from '@angular/core';
import { FontawesomeModalComponent } from './fontawesome-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [
    FontawesomeModalComponent
    ],
  exports: [FontawesomeModalComponent],
  entryComponents: [FontawesomeModalComponent]
})
export class FontawesomeModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomeModalModule,
      providers: []
    };
  }
}
