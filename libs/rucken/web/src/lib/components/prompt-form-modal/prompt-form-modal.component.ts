import { ChangeDetectionStrategy, Component, TemplateRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptModalComponent } from '../../base/base-prompt-modal.component';

@Component({
  selector: 'prompt-form-modal',
  templateUrl: './prompt-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptFormModalComponent extends BasePromptModalComponent {
  @Input()
  footerButtonsTemplate: TemplateRef<any>;
  @Input()
  leftFooterButtonsTemplate: TemplateRef<any>;
  @Input()
  readonlyFooterButtonsTemplate: TemplateRef<any>;
  @Input()
  headerTemplate: TemplateRef<any>;
  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
