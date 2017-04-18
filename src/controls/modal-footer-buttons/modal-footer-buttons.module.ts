import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFooterButtonsComponent } from './modal-footer-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [ModalFooterButtonsComponent],
  exports: [ModalFooterButtonsComponent],
  entryComponents: [ModalFooterButtonsComponent]
})
export class ModalFooterButtonsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalFooterButtonsModule,
      providers: []
    };
  }
}
