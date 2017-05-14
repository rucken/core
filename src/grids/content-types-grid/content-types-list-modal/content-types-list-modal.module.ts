import { ContentTypesGridModule } from '../content-types-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypesListModalComponent } from './content-types-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), ContentTypesGridModule.forRoot()
  ],
  declarations: [
    ContentTypesListModalComponent
  ],
  exports: [ContentTypesListModalComponent],
  entryComponents: [ContentTypesListModalComponent]
})
export class ContentTypesListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesListModalModule,
      providers: []
    };
  }
}
