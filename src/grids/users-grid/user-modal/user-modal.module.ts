import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from './../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { UserGroupsGridModule } from './../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from './../../../controls/checkboxes-input/checkboxes-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), UserGroupsGridModule.forRoot(),
    TextInputModule.forRoot(), CheckboxesInputModule.forRoot()
  ],
  declarations: [
    UserModalComponent
  ],
  exports: [UserModalComponent],
  entryComponents: [UserModalComponent]
})
export class UserModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModalModule,
      providers: []
    };
  }
}
