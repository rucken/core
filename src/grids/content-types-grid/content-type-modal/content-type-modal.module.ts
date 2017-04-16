import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeModalComponent } from './content-type-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), TextInputModule.forRoot()
  ],
  declarations: [
    ContentTypeModalComponent
  ],
  exports: [ContentTypeModalComponent],
  entryComponents: [ContentTypeModalComponent]
})
export class ContentTypeModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeModalModule,
      providers: []
    };
  }
}
