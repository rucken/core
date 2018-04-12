import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../../directives/directives.module';
import { MessageModalComponent } from './message-modal.component';
import { MessageModalService } from './message-modal.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    DirectivesModule.forRoot(),
    TranslateModule.forChild()
  ],
  providers: [
    MessageModalService
  ],
  declarations: [
    MessageModalComponent
  ],
  entryComponents: [
    MessageModalComponent
  ]
})
export class MessageModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessageModalModule,
      providers: [
        MessageModalService
      ]
    };
  }
}
