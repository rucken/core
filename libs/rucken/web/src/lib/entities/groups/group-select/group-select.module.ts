import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntitySelectModule } from '../../../components/entity-select/entity-select.module';
import { GroupsGridModalModule } from '../groups-grid-modal/groups-grid-modal.module';
import { GroupSelectComponent } from './group-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, GroupsGridModalModule, NgxBindIOModule],
  declarations: [GroupSelectComponent],
  exports: [GroupSelectComponent, EntitySelectModule, GroupsGridModalModule]
})
export class GroupSelectModule {}
