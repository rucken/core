import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { GroupModalModule } from '../../group/group-modal/group-modal.module';
import { GroupsGridModalModule } from '../../group/groups-grid-modal/groups-grid-modal.module';
import { UserGroupsGridComponent } from './user-groups-grid.component';
import { MessageModalModule } from '../../../modals/message-modal/message-modal.module';

@NgModule({
  imports: [
    CommonModule,
    MessageModalModule,
    TranslateModule.forChild(),
    EntityGridModule,
    GroupsGridModalModule,
    GroupModalModule,
    ModalModule.forRoot(),
    PipesModule
  ],
  declarations: [
    UserGroupsGridComponent
  ],
  exports: [
    UserGroupsGridComponent
  ]
})
export class UserGroupsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserGroupsGridModule,
      providers: []
    };
  }
}
