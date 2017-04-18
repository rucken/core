import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileFormComponent } from './account-profile-form.component';
import { UserGroupsGridModule } from '../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, TextInputModule.forRoot(),
    CheckboxesInputModule.forRoot(), ModalFooterButtonsModule.forRoot(),
    UserGroupsGridModule.forRoot()
  ],
  declarations: [
    AccountProfileFormComponent
  ],
  exports: [AccountProfileFormComponent],
  entryComponents: [AccountProfileFormComponent]
})
export class AccountProfileFormModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountProfileFormModule,
      providers: []
    };
  }
}
