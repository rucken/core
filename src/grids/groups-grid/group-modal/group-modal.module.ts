import { NgModule, ModuleWithProviders } from '@angular/core';
import { GroupModalComponent } from './group-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { GroupPermissionsGridModule } from './../../group-permissions-grid/group-permissions-grid.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), GroupPermissionsGridModule.forRoot(),
    TextInputModule.forRoot()
  ],
  declarations: [
    GroupModalComponent
  ],
  exports: [GroupModalComponent],
  entryComponents: [GroupModalComponent]
})
export class GroupModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModalModule,
      providers: []
    };
  }
}
