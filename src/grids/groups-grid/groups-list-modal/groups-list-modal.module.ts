import { GroupsGridModule } from './../groups-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { GroupsListModalComponent } from './groups-list-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { SharedModule } from '../../../shared/shared.module';

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
