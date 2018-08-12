import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '../prompt-form-modal/prompt-form-modal.module';
import { EntityModalComponent } from './entity-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule],
  declarations: [EntityModalComponent],
  entryComponents: [EntityModalComponent],
  exports: [EntityModalComponent, PromptFormModalModule]
})
export class EntityModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntityModalModule,
      providers: []
    };
  }
}
