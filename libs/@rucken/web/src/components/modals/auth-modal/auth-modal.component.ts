import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '../../base/base-prompt-form-modal.component';
import { AuthModalModel } from './auth-modal.model';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent extends BasePromptFormModalComponent<AuthModalModel> {

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
    this.group(AuthModalModel);
  }
}
