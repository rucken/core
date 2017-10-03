import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../../shared/shared.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { ContentTypesGridModule } from './../content-types-grid.module';
import { ContentTypesListModalComponent } from './content-types-list-modal.component';

@NgModule({
  imports: [
    ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot(), ContentTypesGridModule.forRoot()
  ],

  declarations: [
    ContentTypesListModalComponent
  ],
  exports: [ContentTypesListModalComponent],
  entryComponents: [ContentTypesListModalComponent]
})
export class ContentTypesListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesListModalModule,
      providers: []
    };
  }
}
