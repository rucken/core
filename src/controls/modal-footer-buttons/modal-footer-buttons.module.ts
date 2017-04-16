import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFooterButtonsComponent } from './modal-footer-buttons.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule.forRoot()],
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
