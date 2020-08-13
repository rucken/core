import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityGridModule } from '../../../components/entity-grid/entity-grid.module';
import { WebModalsModule } from '../../../modules/modals/modals.module';
import { GroupModalModule } from '../group-modal/group-modal.module';
import { GroupsGridComponent } from './groups-grid.component';
import { NgxBindIOModule } from 'ngx-bind-io';

@NgModule({
  imports: [CommonModule, WebModalsModule, EntityGridModule, GroupModalModule, NgxBindIOModule],
  declarations: [GroupsGridComponent],
  exports: [GroupsGridComponent, EntityGridModule, GroupModalModule]
})
export class GroupsGridModule {}
