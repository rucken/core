import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityInputModule } from '../../../components/entity-input/entity-input.module';
import { GroupsGridModalModule } from '../groups-grid-modal/groups-grid-modal.module';
import { GroupInputComponent } from './group-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, GroupsGridModalModule],
  declarations: [GroupInputComponent],
  exports: [GroupInputComponent, EntityInputModule, GroupsGridModalModule]
})
export class GroupInputModule {}
