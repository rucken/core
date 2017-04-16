import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { UserGroupsGridModule } from '../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
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
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModalModule,
      providers: []
    };
  }
}
