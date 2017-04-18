import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomesListModalComponent } from './fontawesomes-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from '../../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { FontawesomesGridModule } from '../fontawesomes-grid.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot(), FontawesomesGridModule.forRoot()
  ],
  declarations: [
    FontawesomesListModalComponent
  ],
  exports: [FontawesomesListModalComponent],
  entryComponents: [FontawesomesListModalComponent]
})
export class FontawesomesListModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomesListModalModule,
      providers: []
    };
  }
}
