import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { GroupModalModule } from '../group-modal/group-modal.module';
import { GroupsGridComponent } from './groups-grid.component';

@NgModule({
  imports: [
    CommonModule,
    EntityGridModule,
    GroupModalModule
  ],
  declarations: [
    GroupsGridComponent
  ],
  exports: [
    GroupsGridComponent,
    EntityGridModule,
    GroupModalModule,
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
