import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { GroupPermissionsGridModule } from '../group-permissions-grid/group-permissions-grid.module';
import { GroupModalComponent } from './group-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    GroupPermissionsGridModule
  ],
  declarations: [
    GroupModalComponent
  ],
  entryComponents: [
    GroupModalComponent
  ],
  exports: [
    GroupModalComponent,
    PromptFormModalModule
  ]
})
export class GroupModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupModalModule,
      providers: []
    };
  }
}
