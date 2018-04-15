import { Component, Input } from '@angular/core';
import { Permission } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '../../../base/base-prompt-form-modal.component';

@Component({
  selector: 'permission-modal',
  templateUrl: './permission-modal.component.html'
})
export class PermissionModalComponent extends BasePromptFormModalComponent<Permission> {

  @Input()
  apiUrl?: string;

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
    this.group(Permission);
  }
}
