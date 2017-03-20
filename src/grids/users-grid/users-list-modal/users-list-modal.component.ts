import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ng2-bootstrap';
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
  hardReadonly: boolean = false;
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
  account: User | any;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<UsersListModalComponent>;

  item: User | any;
  items: User[] | any[];
  public modelMeta: any = User.meta;

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
    this.users.hardReadonly = this.hardReadonly;
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.users.focus();
  }

  selectUser(items: User[] | any[]) {
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
