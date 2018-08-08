import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptModalComponent } from '../../base/base-prompt-modal.component';

@Component({
  selector: 'entity-grid-modal',
  templateUrl: './entity-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityGridModalComponent extends BasePromptModalComponent {
  @Input()
  yesClass = 'btn btn-success';

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
