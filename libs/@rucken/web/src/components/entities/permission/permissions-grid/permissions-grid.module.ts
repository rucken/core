import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { EntityModalModule } from '../../../others/entity-modal/entity-modal.module';
import { PermissionModalModule } from '../permission-modal/permission-modal.module';
import { PermissionsGridComponent } from './permissions-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    EntityGridModule,
    EntityModalModule,
    PermissionModalModule,
    ModalModule,
    PipesModule
  ],
  declarations: [
    PermissionsGridComponent
  ],
  exports: [
    PermissionsGridComponent
  ]
})
export class PermissionsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsGridModule,
      providers: []
    };
  }
}
