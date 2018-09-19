import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectModule } from '../../../components/entity-select/entity-select.module';
import { PermissionsGridModalModule } from '../permissions-grid-modal/permissions-grid-modal.module';
import { PermissionSelectComponent } from './permission-select.component';

@NgModule({
  imports: [
    CommonModule,
    EntitySelectModule,
    PermissionsGridModalModule
  ],
  declarations: [
    PermissionSelectComponent
  ],
  exports: [
    PermissionSelectComponent,
    EntitySelectModule,
    PermissionsGridModalModule
  ]
})
export class PermissionSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionSelectModule,
      providers: []
    };
  }
}
