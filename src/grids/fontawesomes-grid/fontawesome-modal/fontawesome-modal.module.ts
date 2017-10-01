import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { FontawesomeModalComponent } from './fontawesome-modal.component';

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
