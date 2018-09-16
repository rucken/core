import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Group, User } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '../../../base/base-prompt-form-modal.component';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent extends BasePromptFormModalComponent<User> {
  @Input()
  apiUrl?: string;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
    this.group(User);
  }
  onGroupsChange(groups: Group[]) {
    // todo: remove after ngx-dynamic-form-builder updated with correct work with arrays
    const data: User = this.data;
    data.groups = groups;
    this.data = data;
  }
}
