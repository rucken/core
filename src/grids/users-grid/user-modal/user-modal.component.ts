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
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})

export class UserModalComponent extends BaseComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('userGroups')
  userGroups: UserGroupsGridComponent;
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
  item: any | User = new User();
  @Input()
  public modelMeta: any = User.meta();
  @Output()
  onClose: EventEmitter<UserModalComponent | any> = new EventEmitter();
  @Output()
  onSave: EventEmitter<UserModalComponent | any> = new EventEmitter();

  init() {
    super.init();
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => {
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
    });
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }
  save() {
    this.item.groups =
      this.userGroups.mockedItems.map((userGroup: UserGroup) => userGroup.group);
    this.onSave.emit(this);
    return false;
  }
}
