import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { UsersGridComponent } from '../users-grid.component';

@Component({
  selector: 'users-list-modal',
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.component.scss']
})

export class UsersListModalComponent implements OnInit {

  @Input()
  text: string;
  @Input()
  class: string;
  @Input()
  readonly: boolean;
  @Input()
  hardReadonly = false;
  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Output()
  onClose: EventEmitter<UsersListModalComponent>;
  @Input()
  hideOnClose?: boolean;

  @ViewChild('users')
  users: UsersGridComponent;

  @Input()
  account: any | User;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<UsersListModalComponent>;

  item: any | User;
  items: any[] | User[];
  public modelMeta: any = User.meta();

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<UsersListModalComponent>();
    this.item = new User();
    this.onSave = new EventEmitter<UsersListModalComponent>();
  }

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.users.focus();
  }

  selectUser(items: any[] | User[]) {
    this.item = items[0];
    this.items = items;
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }

  select() {
    this.onSave.emit(this);
    return false;
  }
}
