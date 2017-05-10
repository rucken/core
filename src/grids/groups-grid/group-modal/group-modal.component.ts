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

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})

export class GroupModalComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('groupPermissions')
  groupPermissions: GroupPermissionsGridComponent;
  @Input()
  text = '';
  @Input()
  class = '';
  @Input()
  readonly = false;
  @Input()
  hideOnClose? = true;
  @Input()
  account: any | User = null;
  @Input()
  title = '';
  @Input()
  item: any | Group = new Group();
  @Input()
  public modelMeta: any = Group.meta();
  @Output()
  onClose: EventEmitter<GroupModalComponent> = new EventEmitter<GroupModalComponent>();
  @Output()
  onSave: EventEmitter<GroupModalComponent> = new EventEmitter<GroupModalComponent>();

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => {
      this.focus();
      this.groupPermissions.group = this.item;
      this.groupPermissions.mockedItems =
        this.item.permissions.map((permission: any | Permission) => {
          return new GroupPermission({
            id: permission.pk,
            permission: permission
          });
        });
      this.groupPermissions.search();
    });
  }
  focus() {
    this.focusElement.focus();
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }
  save() {
    this.item.permissions =
      this.groupPermissions.mockedItems.map((groupPermission: GroupPermission) => groupPermission.permission);
    this.onSave.emit(this);
    return false;
  }
}
