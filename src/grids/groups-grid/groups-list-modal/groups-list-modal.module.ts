import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../../shared/shared.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { GroupsGridModule } from './../groups-grid.module';
import { GroupsListModalComponent } from './groups-list-modal.component';

@NgModule({
  imports: [
    ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), GroupsGridModule.forRoot()
  ],

  declarations: [
    GroupsListModalComponent
  ],
  exports: [GroupsListModalComponent],
  entryComponents: [GroupsListModalComponent]
})
export class GroupsListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsListModalModule,
      providers: []
    };
  }
}
