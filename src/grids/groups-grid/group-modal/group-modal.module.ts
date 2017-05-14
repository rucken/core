import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModalComponent } from './group-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { GroupPermissionsGridModule } from '../../group-permissions-grid/group-permissions-grid.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), GroupPermissionsGridModule.forRoot(),
    TextInputModule.forRoot()
  ],
  declarations: [
    GroupModalComponent
  ],
  exports: [GroupModalComponent],
  entryComponents: [GroupModalComponent]
})
export class GroupModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModalModule,
      providers: []
    };
  }
}
