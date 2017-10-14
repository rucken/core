import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Group } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
    BaseResourceListModalComponent,
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { GroupsGridComponent } from './../groups-grid.component';

@Component({
  selector: 'groups-list-modal',
  templateUrl: './groups-list-modal.component.html',
  styleUrls: ['./groups-list-modal.component.scss']
})

export class GroupsListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: GroupsGridComponent;
  @ViewChild('groups')
  groups: GroupsGridComponent;

  @Output()
  onClose: EventEmitter<GroupsListModalComponent> = new EventEmitter<GroupsListModalComponent>();
  @Output()
  onOk: EventEmitter<GroupsListModalComponent> = new EventEmitter<GroupsListModalComponent>();

  item: any | Group = new Group();
  items: any[] | Group[] = [];
  modelMeta: any = Group.meta();

  selectGroup(items: any[] | Group[]) {
    this.item = items[0];
    this.items = items;
  }
}
