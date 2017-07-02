import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileFormComponent } from './account-profile-form.component';
import { UserGroupsGridModule } from './../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from './../../../controls/checkboxes-input/checkboxes-input.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, TextInputModule.forRoot(),
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
