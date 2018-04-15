import { Component, Input } from '@angular/core';
import { Group, Permission } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '../../../base/base-prompt-form-modal.component';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html'
})
export class GroupModalComponent extends BasePromptFormModalComponent<Group> {

  @Input()
  apiUrl?: string;

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
    this.group(Group);
  }
  onPermissionsChange(permissions: Permission[]) {
    // todo: remove after ngx-dynamic-form-builder updated with correct work with arrays
    const data: Group = this.data;
    data.permissions = permissions;
    this.data = data;
  }
}
