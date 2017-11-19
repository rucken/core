import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User, translate } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BaseModalComponent } from './../../base/base-modal/base-modal.component';
import { TextInputComponent } from './../../controls/text-input/text-input.component';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthModalComponent extends BaseModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;

  @Input()
  name = 'auth';
  @Input()
  okTitle = translate('Login');
  @Input()
  closeTitle = translate('Cancel');
  @Output()
  onClose: EventEmitter<AuthModalComponent | any> = new EventEmitter<any>();
  @Output()
  onOk: EventEmitter<AuthModalComponent | any> = new EventEmitter<any>();

  modelMeta: any = User.meta();
  user: User | any;

  init() {
    super.init();
    this.user = new User();
  }
}
