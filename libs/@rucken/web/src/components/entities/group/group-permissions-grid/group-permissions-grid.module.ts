import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { MessageModalModule } from '../../../modals/message-modal/message-modal.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { PermissionsGridModalModule } from '../../permission/permissions-grid-modal/permissions-grid-modal.module';
import { GroupPermissionsGridComponent } from './group-permissions-grid.component';

@NgModule({
  imports: [
    CommonModule,
    MessageModalModule,
    TranslateModule.forChild(),
    EntityGridModule,
    PermissionsGridModalModule,
    ModalModule.forRoot(),
    PipesModule
  ],
  declarations: [
    GroupPermissionsGridComponent
  ],
  exports: [
    GroupPermissionsGridComponent
  ]
})
export class GroupPermissionsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupPermissionsGridModule,
      providers: []
    };
  }
}
