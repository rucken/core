import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule, PipesModule } from '@rucken/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormGroupModule } from '../form-group/form-group.module';
import { PromptFormModalComponent } from './prompt-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    TranslateModule.forChild(),
    AlertModule.forRoot(),
    PipesModule,
    FormGroupModule,
    FontAwesomeModule
  ],
  declarations: [PromptFormModalComponent],
  entryComponents: [PromptFormModalComponent],
  exports: [PromptFormModalComponent, ReactiveFormsModule, FormsModule, DirectivesModule, PipesModule, FormGroupModule]
})
export class PromptFormModalModule { }
