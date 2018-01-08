import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Group } from '@rucken/core';
import { Permission } from '@rucken/core';
import { GroupPermission } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  BaseResourceModalComponent,
} from './../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { GroupPermissionsGridComponent } from './../../group-permissions-grid/group-permissions-grid.component';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html'
})

export class GroupModalComponent extends BaseResourceModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('groupPermissions')
  groupPermissions: GroupPermissionsGridComponent;

  @Input()
  item: any | Group = new Group();
  @Input()
  modelMeta: any = Group.meta();
  @Output()
  onClose: EventEmitter<GroupModalComponent> = new EventEmitter<GroupModalComponent>();
  @Output()
  onOk: EventEmitter<GroupModalComponent> = new EventEmitter<GroupModalComponent>();
  afterOpen() {
    this.groupPermissions.group = this.item;
    this.groupPermissions.mockedItems =
      this.item.permissions.map((permission: any | Permission) => {
        return new GroupPermission({
          id: permission.pk,
          permission: permission
        });
      });
    this.groupPermissions.search();
  }

  ok() {
    this.item.permissions =
      this.groupPermissions.mockedItems.map((groupPermission: GroupPermission) => groupPermission.permission);
    return super.ok();
  }
}
