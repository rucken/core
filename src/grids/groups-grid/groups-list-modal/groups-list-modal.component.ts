import {
  BaseResourceListModalComponent
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Group } from './../../../shared/models/group.model';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
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
  onSave: EventEmitter<GroupsListModalComponent> = new EventEmitter<GroupsListModalComponent>();

  item: any | Group = new Group();
  items: any[] | Group[] = [];
  modelMeta: any = Group.meta();

  selectGroup(items: any[] | Group[]) {
    this.item = items[0];
    this.items = items;
  }
}
