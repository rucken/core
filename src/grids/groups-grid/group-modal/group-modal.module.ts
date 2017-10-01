import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { GroupPermissionsGridModule } from './../../group-permissions-grid/group-permissions-grid.module';
import { GroupModalComponent } from './group-modal.component';

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
