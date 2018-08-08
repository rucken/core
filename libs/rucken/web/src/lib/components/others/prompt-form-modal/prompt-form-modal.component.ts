import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptModalComponent } from '../../base/base-prompt-modal.component';

@Component({
  selector: 'prompt-form-modal',
  templateUrl: './prompt-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptFormModalComponent extends BasePromptModalComponent {
  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
