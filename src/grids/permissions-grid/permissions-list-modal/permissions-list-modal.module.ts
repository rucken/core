import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from '../../../controls/footer-buttons/footer-buttons.module';
import { PermissionsGridModule } from './../permissions-grid.module';
import { PermissionsListModalComponent } from './permissions-list-modal.component';

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
