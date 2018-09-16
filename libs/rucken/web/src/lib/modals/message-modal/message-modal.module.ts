import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../directives/directives.module';
import { MessageModalComponent } from './message-modal.component';
import { MessageModalService } from './message-modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    DirectivesModule,
    TranslateModule.forChild(),
    FontAwesomeModule
  ],
  providers: [MessageModalService],
  declarations: [MessageModalComponent],
  entryComponents: [MessageModalComponent],
  exports: [MessageModalComponent, DirectivesModule]
})
export class MessageModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessageModalModule,
      providers: []
    };
  }
}
