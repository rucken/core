import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../directives/directives.module';
import { EntityModalModule } from '../entity-modal/entity-modal.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { EntityGridModalComponent } from './entity-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    TranslateModule.forChild(),
    FormGroupModule,
    EntityModalModule,
    FontAwesomeModule
  ],
  declarations: [EntityGridModalComponent],
  entryComponents: [EntityGridModalComponent],
  exports: [
    EntityGridModalComponent,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    FormGroupModule,
    EntityModalModule
  ]
})
export class EntityGridModalModule {}
