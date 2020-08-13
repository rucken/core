import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityGridModalModule } from '../../../components/entity-grid-modal/entity-grid-modal.module';
import { GroupsGridModule } from '../groups-grid/groups-grid.module';
import { GroupsGridModalComponent } from './groups-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, GroupsGridModule, NgxBindIOModule],
  declarations: [GroupsGridModalComponent],
  entryComponents: [GroupsGridModalComponent],
  exports: [GroupsGridModalComponent, EntityGridModalModule, GroupsGridModule]
})
export class GroupsGridModalModule {}
