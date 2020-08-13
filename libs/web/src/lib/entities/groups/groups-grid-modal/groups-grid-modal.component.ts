import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BaseEntityListModalComponent, Group } from '@rucken/core';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'groups-grid-modal',
  templateUrl: './groups-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsGridModalComponent extends BaseEntityListModalComponent<Group> {
  @ViewChild('grid')
  grid: GroupsGridComponent;
  @Input()
  apiUrl?: string = undefined;

  constructor() {
    super();
  }
}
