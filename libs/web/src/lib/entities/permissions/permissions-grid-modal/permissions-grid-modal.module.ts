import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityGridModalModule } from '../../../components/entity-grid-modal/entity-grid-modal.module';
import { PermissionsGridModule } from '../permissions-grid/permissions-grid.module';
import { PermissionsGridModalComponent } from './permissions-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, PermissionsGridModule, NgxBindIOModule],
  declarations: [PermissionsGridModalComponent],
  entryComponents: [PermissionsGridModalComponent],
  exports: [PermissionsGridModalComponent, EntityGridModalModule, PermissionsGridModule]
})
export class PermissionsGridModalModule {}
