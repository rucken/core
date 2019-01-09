import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModalService } from '@rucken/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PromptFormModalModule } from '../../components/prompt-form-modal/prompt-form-modal.module';
import { WebAuthModalComponent } from './auth-modal.component';
import { WebAuthModalService } from './auth-modal.service';
@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    TranslateModule.forChild(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  declarations: [WebAuthModalComponent],
  entryComponents: [WebAuthModalComponent],
  exports: [WebAuthModalComponent, PromptFormModalModule],
  providers: [WebAuthModalService, { provide: AuthModalService, useClass: WebAuthModalService }]
})
export class WebAuthModalModule {}
