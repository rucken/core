import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserModalComponent } from './user-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { UserGroupsGridModule } from './../../user-groups-grid/user-groups-grid.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { CheckboxesInputModule } from './../../../controls/checkboxes-input/checkboxes-input.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

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
