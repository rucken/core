import { NgModule, ModuleWithProviders } from '@angular/core';
import { FontawesomesListModalComponent } from './fontawesomes-list-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { FontawesomesGridModule } from './../fontawesomes-grid.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    ModalModule.forRoot(), SharedModule.forRoot(),
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
