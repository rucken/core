import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../directives/directives.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { EntityGridModalComponent } from './entity-grid-modal.component';
import { EntityModalModule } from '../entity-modal/entity-modal.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
export class EntityGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntityGridModalModule,
      providers: []
    };
  }
}
