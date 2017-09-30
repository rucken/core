import { NgModule, ModuleWithProviders } from '@angular/core';
import { UsersListModalComponent } from './users-list-modal.component';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { UsersGridModule } from './../users-grid.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '@rucken/core';

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
