import { Component, Output, Input, ViewChild, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { User } from './../../shared/models/user.model';
import { AppService } from './../../shared/app.service';
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
  onLogin: EventEmitter<AuthModalComponent | any> = new EventEmitter();

  modelMeta: any = User.meta();

  init() {
    super.init();
    this.account = new User();
  }
  login() {
    this.onLogin.emit(this);
    return false;
  }
}
