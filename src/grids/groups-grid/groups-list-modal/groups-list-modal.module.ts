import { GroupsGridModule } from '../groups-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListModalComponent } from './groups-list-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), GroupsGridModule.forRoot()
  ],
  declarations: [
    GroupsListModalComponent
  ],
  exports: [GroupsListModalComponent],
  entryComponents: [GroupsListModalComponent]
})
export class GroupsListModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsListModalModule,
      providers: []
    };
  }
}
