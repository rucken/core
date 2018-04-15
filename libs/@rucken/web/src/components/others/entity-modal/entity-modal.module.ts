import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../directives/directives.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { PromptFormModalModule } from '../prompt-form-modal/prompt-form-modal.module';
import { EntityModalComponent } from './entity-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    FormGroupModule,
    PromptFormModalModule,
    DirectivesModule
  ],
  declarations: [
    EntityModalComponent
  ],
  entryComponents: [
    EntityModalComponent
  ],
  exports: [
    EntityModalComponent
  ]
})
export class EntityModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntityModalModule,
      providers: []
    };
  }
}
