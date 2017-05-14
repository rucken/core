import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from '../../../shared/account.service';
import { TextInputComponent } from '../../../controls/text-input/text-input.component';
import { UserGroupsGridComponent } from '../../user-groups-grid/user-groups-grid.component';
import { Group } from '../../../shared/models/group.model';
import { UserGroup } from '../../../shared/models/user-group.model';
import { BaseResourceModalComponent } from '../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent extends BaseResourceModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('userGroups')
  userGroups: UserGroupsGridComponent;
  @Input()
  item: any | User = new User();
  @Input()
  modelMeta: any = User.meta();
  @Output()
  onClose: EventEmitter<UserModalComponent | any> = new EventEmitter();
  @Output()
  onSave: EventEmitter<UserModalComponent | any> = new EventEmitter();

  afterOpen() {
    this.focus();
    this.userGroups.user = this.item;
    this.userGroups.mockedItems =
      this.item.groups.map((group: any | Group) => {
        return new UserGroup({
          id: group.pk,
          group: group
        });
      });
    this.userGroups.search();
  }
  save() {
    this.item.groups =
      this.userGroups.mockedItems.map((userGroup: UserGroup) => userGroup.group);
    return super.save();
  }
}
