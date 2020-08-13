import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { PromptFormModalModule } from '../../../components/prompt-form-modal/prompt-form-modal.module';
import { GroupPermissionsGridModule } from '../group-permissions-grid/group-permissions-grid.module';
import { GroupModalComponent } from './group-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule, GroupPermissionsGridModule, NgxBindIOModule],
  declarations: [GroupModalComponent],
  entryComponents: [GroupModalComponent],
  exports: [GroupModalComponent, PromptFormModalModule]
})
export class GroupModalModule {}
