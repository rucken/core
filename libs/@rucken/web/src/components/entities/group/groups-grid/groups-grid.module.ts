import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { EntityModalModule } from '../../../others/entity-modal/entity-modal.module';
import { GroupModalModule } from '../group-modal/group-modal.module';
import { GroupsGridComponent } from './groups-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    EntityGridModule,
    EntityModalModule,
    GroupModalModule,
    ModalModule.forRoot(),
    PipesModule
  ],
  declarations: [
    GroupsGridComponent
  ],
  exports: [
    GroupsGridComponent
  ]
})
export class GroupsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsGridModule,
      providers: []
    };
  }
}
