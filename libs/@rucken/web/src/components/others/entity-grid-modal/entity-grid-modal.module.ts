import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormGroupModule } from '../../others/form-group/form-group.module';
import { EntityGridModalComponent } from './entity-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    TranslateModule.forChild(),
    FormGroupModule
  ],
  declarations: [
    EntityGridModalComponent
  ],
  entryComponents: [
    EntityGridModalComponent
  ],
  exports: [
    EntityGridModalComponent
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
