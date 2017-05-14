import { GroupsGridModule } from './../groups-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListModalComponent } from './groups-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from './../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), GroupsGridModule.forRoot()
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
