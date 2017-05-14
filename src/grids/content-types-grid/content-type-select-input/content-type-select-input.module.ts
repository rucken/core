import { SelectInputModule } from '../../../controls/select-input/select-input.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypeSelectInputComponent } from './content-type-select-input.component';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContentTypesListModalModule } from '../../../grids/content-types-grid/content-types-list-modal/content-types-list-modal.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ContentTypesListModalModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), TextInputModule.forRoot(),
    TooltipModule.forRoot(), SelectInputModule.forRoot()
  ],
  declarations: [
    ContentTypeSelectInputComponent
  ],
  exports: [ContentTypeSelectInputComponent],
  entryComponents: [ContentTypeSelectInputComponent]
})
export class ContentTypeSelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeSelectInputModule,
      providers: []
    };
  }
}
