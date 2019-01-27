import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntitySelectModule } from '../../../components/entity-select/entity-select.module';
import { PermissionsGridModalModule } from '../permissions-grid-modal/permissions-grid-modal.module';
import { PermissionSelectComponent } from './permission-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, PermissionsGridModalModule, NgxBindIOModule],
  declarations: [PermissionSelectComponent],
  exports: [PermissionSelectComponent, EntitySelectModule, PermissionsGridModalModule]
})
export class PermissionSelectModule {}
