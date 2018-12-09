import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { ModalsModule, ModalsService } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../directives/directives.module';
import { MessageModalComponent } from './message-modal.component';
import { WebModalsService } from './modals.service';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    ModalModule.forRoot(),
    DirectivesModule,
    TranslateModule.forChild(),
    FontAwesomeModule
  ],
  providers: [WebModalsService, { provide: ModalsService, useClass: WebModalsService }],
  declarations: [MessageModalComponent],
  entryComponents: [MessageModalComponent],
  exports: [ModalModule, ModalsModule, MessageModalComponent, DirectivesModule]
})
export class WebModalsModule {}
