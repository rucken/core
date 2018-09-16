import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '../../../components/entity-grid/entity-grid.module';
import { PermissionModalModule } from '../permission-modal/permission-modal.module';
import { PermissionsGridComponent } from './permissions-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, PermissionModalModule],
  declarations: [PermissionsGridComponent],
  exports: [PermissionsGridComponent, EntityGridModule, PermissionModalModule]
})
export class PermissionsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsGridModule,
      providers: []
    };
  }
}
