import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { CheckboxesInputModule } from './../../../controls/checkboxes-input/checkboxes-input.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { UserGroupsGridModule } from './../../user-groups-grid/user-groups-grid.module';
import { AccountProfileFormComponent } from './account-profile-form.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), FormsModule, TextInputModule.forRoot(),
    CheckboxesInputModule.forRoot(), FooterButtonsModule.forRoot(),
    UserGroupsGridModule.forRoot()
  ],
  declarations: [
    AccountProfileFormComponent
  ],
  exports: [AccountProfileFormComponent],
  entryComponents: [AccountProfileFormComponent]
})
export class AccountProfileFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountProfileFormModule,
      providers: []
    };
  }
}
