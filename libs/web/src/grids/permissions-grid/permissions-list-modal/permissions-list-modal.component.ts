import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Permission } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  BaseResourceListModalComponent,
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { PermissionsGridComponent } from './../permissions-grid.component';

@Component({
  selector: 'permissions-list-modal',
  templateUrl: './permissions-list-modal.component.html',
  styleUrls: ['./permissions-list-modal.component.scss']
})

export class PermissionsListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: PermissionsGridComponent;
  @ViewChild('permissions')
  permissions: PermissionsGridComponent;

  @Output()
  onClose: EventEmitter<PermissionsListModalComponent> = new EventEmitter<PermissionsListModalComponent>();
  @Output()
  onOk: EventEmitter<PermissionsListModalComponent> = new EventEmitter<PermissionsListModalComponent>();

  item: any | Permission = new Permission();
  items: any[] | Permission[] = [];
  modelMeta: any = Permission.meta();

  selectPermission(items: any[] | Permission[]) {
    this.item = items[0];
    this.items = items;
  }
}
