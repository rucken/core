import { Component, Input, ViewChild } from '@angular/core';
import { Group } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseEntityListModalComponent } from '../../../base/base-entity-list-modal.component';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';

@Component({
  selector: 'groups-grid-modal',
  templateUrl: './groups-grid-modal.component.html'
})
export class GroupsGridModalComponent extends BaseEntityListModalComponent<Group> {

  @ViewChild('grid')
  grid: GroupsGridComponent;
  @Input()
  apiUrl?: string;

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
  }
}
