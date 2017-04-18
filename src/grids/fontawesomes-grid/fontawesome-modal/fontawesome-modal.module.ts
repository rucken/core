import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeModalComponent } from './fontawesome-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
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
