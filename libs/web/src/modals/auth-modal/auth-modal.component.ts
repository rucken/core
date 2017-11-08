import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BaseModalComponent } from './../../base/base-modal/base-modal.component';
import { TextInputComponent } from './../../controls/text-input/text-input.component';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthModalComponent extends BaseModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;

  @Input()
  name = 'auth';
  @Output()
  onClose: EventEmitter<AuthModalComponent | any> = new EventEmitter<any>();
  @Output()
  onOk: EventEmitter<AuthModalComponent | any> = new EventEmitter<any>();

  modelMeta: any = User.meta();

  init() {
    super.init();
    this.account = new User();
  }
}
