import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileFormComponent } from './account-profile-form.component';
import { UserGroupsGridModule } from '../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';

@NgModule({
  imports: [
    CommonModule, UserGroupsGridModule.forRoot(), TextInputModule.forRoot(),
    CheckboxesInputModule.forRoot(), ModalFooterButtonsModule.forRoot()
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
