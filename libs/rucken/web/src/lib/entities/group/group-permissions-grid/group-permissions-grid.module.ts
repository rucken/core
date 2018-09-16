import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PermissionsGridModalModule } from '../../permission/permissions-grid-modal/permissions-grid-modal.module';
import { GroupPermissionsGridComponent } from './group-permissions-grid.component';

@NgModule({
  imports: [CommonModule, PermissionsGridModalModule],
  declarations: [GroupPermissionsGridComponent],
  exports: [GroupPermissionsGridComponent, PermissionsGridModalModule]
})
export class GroupPermissionsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupPermissionsGridModule,
      providers: []
    };
  }
}
