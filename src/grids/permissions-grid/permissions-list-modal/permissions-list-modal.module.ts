import { NgModule, ModuleWithProviders } from '@angular/core';
import { PermissionsListModalComponent } from './permissions-list-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PermissionsGridModule } from './../permissions-grid.module';
import { FooterButtonsModule } from '../../../controls/footer-buttons/footer-buttons.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule.forRoot(), ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), PermissionsGridModule.forRoot(), PermissionsGridModule.forRoot()
  ],
  declarations: [
    PermissionsListModalComponent
  ],
  exports: [PermissionsListModalComponent],
  entryComponents: [PermissionsListModalComponent]
})
export class PermissionsListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsListModalModule,
      providers: []
    };
  }
}
