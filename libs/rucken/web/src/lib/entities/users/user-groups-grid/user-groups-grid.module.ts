import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupModalModule } from '../../groups/group-modal/group-modal.module';
import { GroupsGridModalModule } from '../../groups/groups-grid-modal/groups-grid-modal.module';
import { UserGroupsGridComponent } from './user-groups-grid.component';

@NgModule({
  imports: [CommonModule, GroupsGridModalModule, GroupModalModule],
  declarations: [UserGroupsGridComponent],
  exports: [UserGroupsGridComponent, GroupsGridModalModule, GroupModalModule]
})
export class UserGroupsGridModule {}
