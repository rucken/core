import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityGridModule } from '../../../components/entity-grid/entity-grid.module';
import { WebModalsModule } from '../../../modules/modals/modals.module';
import { PermissionModalModule } from '../permission-modal/permission-modal.module';
import { PermissionsGridComponent } from './permissions-grid.component';

@NgModule({
  imports: [CommonModule, WebModalsModule, EntityGridModule, PermissionModalModule, NgxBindIOModule],
  declarations: [PermissionsGridComponent],
  exports: [PermissionsGridComponent, EntityGridModule, PermissionModalModule]
})
export class PermissionsGridModule {}
