import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from '../../../controls/footer-buttons/footer-buttons.module';
import { SharedModule } from '../../../shared/shared.module';
import { PermissionsGridModule } from './../permissions-grid.module';
import { PermissionsListModalComponent } from './permissions-list-modal.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), ModalModule.forRoot(),
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
