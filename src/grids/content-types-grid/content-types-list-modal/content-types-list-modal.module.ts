import { ContentTypesGridModule } from './../content-types-grid.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypesListModalComponent } from './content-types-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
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
