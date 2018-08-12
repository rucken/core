import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { PermissionsGridModule } from '../permissions-grid/permissions-grid.module';
import { PermissionsGridModalComponent } from './permissions-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, PermissionsGridModule],
  declarations: [PermissionsGridModalComponent],
  entryComponents: [PermissionsGridModalComponent],
  exports: [
    PermissionsGridModalComponent,
    EntityGridModalModule,
    PermissionsGridModule
  ]
})
export class PermissionsGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsGridModalModule,
      providers: []
    };
  }
}
