import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../../shared/shared.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import {
    ContentTypeSelectInputModule,
} from './../../content-types-grid/content-type-select-input/content-type-select-input.module';
import { PermissionModalComponent } from './permission-modal.component';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), TextInputModule.forRoot(),
    ContentTypeSelectInputModule.forRoot()
  ],

  declarations: [
    PermissionModalComponent
  ],
  exports: [PermissionModalComponent],
  entryComponents: [PermissionModalComponent]
})
export class PermissionModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionModalModule,
      providers: []
    };
  }
}
