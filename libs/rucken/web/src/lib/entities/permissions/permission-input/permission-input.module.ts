import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityInputModule } from '../../../components/entity-input/entity-input.module';
import { PermissionsGridModalModule } from '../permissions-grid-modal/permissions-grid-modal.module';
import { PermissionInputComponent } from './permission-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, PermissionsGridModalModule],
  declarations: [PermissionInputComponent],
  exports: [PermissionInputComponent, EntityInputModule, PermissionsGridModalModule]
})
export class PermissionInputModule {}
