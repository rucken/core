import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModalComponent } from './group-modal.component';
import { ModalModule } from 'ng2-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { GroupPermissionsGridModule } from '../../group-permissions-grid/group-permissions-grid.module';
import { TextInputModule } from '../../../controls/text-input/text-input.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ModalFooterButtonsModule.forRoot(), GroupPermissionsGridModule.forRoot(),
    TextInputModule.forRoot()
  ],
  declarations: [
    GroupModalComponent
  ],
  exports: [GroupModalComponent],
  entryComponents: [GroupModalComponent]
})
export class GroupModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModalModule,
      providers: []
    };
  }
}
