import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CheckboxesInputModule } from './../../../controls/checkboxes-input/checkboxes-input.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { UserGroupsGridModule } from './../../user-groups-grid/user-groups-grid.module';
import { UserModalComponent } from './user-modal.component';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), UserGroupsGridModule.forRoot(),
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
