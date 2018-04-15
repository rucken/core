import { Component } from '@angular/core';
import { ContentType } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '../../../base/base-prompt-form-modal.component';

@Component({
  selector: 'content-type-modal',
  templateUrl: './content-type-modal.component.html'
})
export class ContentTypeModalComponent extends BasePromptFormModalComponent<ContentType> {

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
    this.group(ContentType);
  }
}
