import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
    BaseResourceListModalComponent,
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { UsersGridComponent } from './../users-grid.component';

@Component({
  selector: 'users-list-modal',
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.component.scss']
})

export class UsersListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: UsersGridComponent;
  @ViewChild('users')
  users: UsersGridComponent;

  @Output()
  onClose: EventEmitter<UsersListModalComponent> = new EventEmitter<UsersListModalComponent>();
  @Output()
  onOk: EventEmitter<UsersListModalComponent> = new EventEmitter<UsersListModalComponent>();

  item: any | User = new User();
  items: any[] | User[] = [];
  modelMeta: any = User.meta();

  selectUser(items: any[] | User[]) {
    this.item = items[0];
    this.items = items;
  }
}
