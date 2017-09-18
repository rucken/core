import { ContentTypesGridModule } from './../content-types-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ContentTypesListModalComponent } from './content-types-list-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { SharedModule } from '../../../shared/shared.module';

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
