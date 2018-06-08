import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../../directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { PromptFormModalComponent } from './prompt-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    TranslateModule.forChild(),
    PipesModule,
    FormGroupModule
  ],
  declarations: [
    PromptFormModalComponent
  ],
  entryComponents: [
    PromptFormModalComponent
  ],
  exports: [
    PromptFormModalComponent,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    PipesModule,
    FormGroupModule
  ]
})
export class PromptFormModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PromptFormModalModule,
      providers: []
    };
  }
}
