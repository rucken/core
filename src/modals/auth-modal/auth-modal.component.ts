import { Component, Output, Input, ViewChild, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { User } from './../../shared/models/user.model';
import { AppService } from '../../shared/app.service';
import { TextInputComponent } from '../../controls/text-input/text-input.component';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})

export class AuthModalComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @Input()
  title = '';
  @Input()
  class = '';
  @Input()
  hideOnClose? = true;
  @Input()
  hideButton? = false;
  @Input()
  account: any | User = null;
  @Output()
  onClose: EventEmitter<AuthModalComponent | any> = new EventEmitter();
  @Output()
  onLogin: EventEmitter<AuthModalComponent | any> = new EventEmitter();

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  public modelMeta: any = User.meta();

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
    this.init();
  }
  init() {
    this.account = new User();
  }
  focus() {
    this.focusElement.focus();
  }
  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }
  login() {
    this.onLogin.emit(this);
    return false;
  }
}
