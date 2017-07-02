import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomesListModalComponent } from './fontawesomes-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { FontawesomesGridModule } from './../fontawesomes-grid.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    FooterButtonsModule.forRoot(), FontawesomesGridModule.forRoot()
  ],
  declarations: [
    FontawesomesListModalComponent
  ],
  exports: [FontawesomesListModalComponent],
  entryComponents: [FontawesomesListModalComponent]
})
export class FontawesomesListModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomesListModalModule,
      providers: []
    };
  }
}
