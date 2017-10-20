import { Component, Input, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { Group } from '@rucken/core';
import { UserGroup } from '@rucken/core';
import { translate } from '@rucken/core';

import { BaseModalComponent } from '../../../base/base-modal/base-modal.component';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { UserGroupsGridComponent } from './../../user-groups-grid/user-groups-grid.component';

@Component({
  selector: 'account-profile-form',
  templateUrl: './account-profile-form.component.html',
  styleUrls: ['./account-profile-form.component.scss']
})

export class AccountProfileFormComponent extends BaseModalComponent {

  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('userGroups')
  userGroups: UserGroupsGridComponent;

  @Input()
  text = translate('Update');
  @Input()
  class = '';
  @Input()
  readonly = false;
  @Input()
  hideOnClose?= true;
  @Input()
  account: any | User = null;
  @Input()
  title = '';
  @Input()
  item: any | User = new User();
  @Input()
  modelMeta: any = User.meta();

  init() {
    super.init();
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

  cancel() {
    this.onClose.emit(this);
    return false;
  }
  ok() {
    this.item.groups =
      this.userGroups.mockedItems.map((userGroup: UserGroup) => userGroup.group);
    this.onOk.emit(this.item);
    return false;
  }
}
