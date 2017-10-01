import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { UsersGridModule } from './../users-grid.module';
import { UsersListModalComponent } from './users-list-modal.component';

@NgModule({
  imports: [
    ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), UsersGridModule.forRoot()
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
