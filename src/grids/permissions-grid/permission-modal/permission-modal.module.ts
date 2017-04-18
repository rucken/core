import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionModalComponent } from './permission-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { ContentTypeSelectInputModule } from '../../content-types-grid/content-type-select-input/content-type-select-input.module';
import { ModalFooterButtonsComponent } from '../../../controls/modal-footer-buttons/modal-footer-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), TextInputModule.forRoot(),
    ContentTypeSelectInputModule.forRoot()
  ],
  declarations: [
    PermissionModalComponent
  ],
  exports: [PermissionModalComponent],
  entryComponents: [PermissionModalComponent]
})
export class PermissionModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionModalModule,
      providers: []
    };
  }
}
