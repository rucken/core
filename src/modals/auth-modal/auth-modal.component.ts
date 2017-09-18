import { Component, Output, Input, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { User } from './../../shared/models/user.model';
import { TextInputComponent } from './../../controls/text-input/text-input.component';
import { BaseModalComponent } from './../../base/base-modal/base-modal.component';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})

export class AuthModalComponent extends BaseModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;

  @Input()
  name = 'auth';
  @Input()
  account: any | User = null;
  @Output()
  onClose: EventEmitter<AuthModalComponent | any> = new EventEmitter();
  @Output()
  onOk: EventEmitter<AuthModalComponent | any> = new EventEmitter();

  modelMeta: any = User.meta();

  init() {
    super.init();
    this.account = new User();
  }
}
