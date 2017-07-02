import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeModalComponent } from './content-type-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    FooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [
    ContentTypeModalComponent
  ],
  exports: [ContentTypeModalComponent],
  entryComponents: [ContentTypeModalComponent]
})
export class ContentTypeModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeModalModule,
      providers: []
    };
  }
}
