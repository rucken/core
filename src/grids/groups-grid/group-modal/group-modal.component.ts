import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { Group } from './../../../shared/models/group.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from '../../../shared/account.service';
import { User } from '../../../shared/models/user.model';
import { TextInputComponent } from '../../../controls/text-input/text-input.component';
import { GroupPermissionsGridComponent } from '../../group-permissions-grid/group-permissions-grid.component';
import { Permission } from '../../../shared/models/permission.model';
import { GroupPermission } from '../../../shared/models/group-permission.model';
import { BaseResourceModalComponent } from '../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
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
  onSave: EventEmitter<GroupModalComponent> = new EventEmitter<GroupModalComponent>();

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

  save() {
    this.item.permissions =
      this.groupPermissions.mockedItems.map((groupPermission: GroupPermission) => groupPermission.permission);
    return super.save();
  }
}
