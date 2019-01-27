import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { PermissionsGridModalModule } from '../../permissions/permissions-grid-modal/permissions-grid-modal.module';
import { GroupPermissionsGridComponent } from './group-permissions-grid.component';

@NgModule({
  imports: [CommonModule, PermissionsGridModalModule, NgxBindIOModule],
  declarations: [GroupPermissionsGridComponent],
  exports: [GroupPermissionsGridComponent, PermissionsGridModalModule]
})
export class GroupPermissionsGridModule {}
