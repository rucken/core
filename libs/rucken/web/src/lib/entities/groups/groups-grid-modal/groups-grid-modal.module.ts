import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModalModule } from '../../../components/entity-grid-modal/entity-grid-modal.module';
import { GroupsGridModule } from '../groups-grid/groups-grid.module';
import { GroupsGridModalComponent } from './groups-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, GroupsGridModule],
  declarations: [GroupsGridModalComponent],
  entryComponents: [GroupsGridModalComponent],
  exports: [GroupsGridModalComponent, EntityGridModalModule, GroupsGridModule]
})
export class GroupsGridModalModule { }
