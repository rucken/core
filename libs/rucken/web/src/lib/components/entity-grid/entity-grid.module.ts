import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MessageModalModule } from '../../modals/message-modal/message-modal.module';
import { PipesModule } from '../../pipes/pipes.module';
import { EntityGridComponent } from './entity-grid.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    PipesModule,
    MessageModalModule,
    ModalModule.forRoot(),
    FontAwesomeModule
  ],
  declarations: [EntityGridComponent],
  entryComponents: [EntityGridComponent],
  exports: [EntityGridComponent, FormsModule, ReactiveFormsModule, PipesModule, MessageModalModule]
})
export class EntityGridModule {}
