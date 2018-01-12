import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BaseModalComponent } from './../../base/base-modal/base-modal.component';
import { translate } from '@rucken/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html'
})

export class ConfirmModalComponent extends BaseModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Input()
  okTitle = translate('Yes');
  @Input()
  closeTitle = translate('No');
  @Input()
  name = 'confirm';
}
