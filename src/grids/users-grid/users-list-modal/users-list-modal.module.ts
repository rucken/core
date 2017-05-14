import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListModalComponent } from './users-list-modal.component';
import { ModalFooterButtonsModule } from './../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { UsersGridModule } from './../users-grid.module';
import { ModalModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), UsersGridModule.forRoot()
  ],
  declarations: [
    UsersListModalComponent
  ],
  exports: [UsersListModalComponent],
  entryComponents: [UsersListModalComponent]
})
export class UsersListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersListModalModule,
      providers: []
    };
  }
}
