import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListModalComponent } from './users-list-modal.component';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { UsersGridModule } from '../users-grid.module';
import { ModalModule } from 'ng2-bootstrap';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), UsersGridModule.forRoot()
  ],
  declarations: [
    UsersListModalComponent
  ],
  exports: [UsersListModalComponent],
  entryComponents: [UsersListModalComponent]
})
export class UsersListModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersListModalModule,
      providers: []
    };
  }
}
