import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Permission } from './../../../shared/models/permission.model';
import { User } from '././../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { PermissionsGridComponent } from '../permissions-grid.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'permissions-list-modal',
  templateUrl: './permissions-list-modal.component.html',
  styleUrls: ['./permissions-list-modal.component.scss']
})

export class PermissionsListModalComponent extends BaseComponent {

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
  onClose: EventEmitter<PermissionsListModalComponent>;
  @Input()
  hideOnClose?: boolean;

  @ViewChild('permissions')
  permissions: PermissionsGridComponent;

  @Input()
  account: any | User;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<PermissionsListModalComponent>;

  item: any | Permission;
  items: any[] | Permission[];
  public modelMeta: any = Permission.meta();

  constructor() {
    super();
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<PermissionsListModalComponent>();
    this.item = new Permission();
    this.onSave = new EventEmitter<PermissionsListModalComponent>();
  }

  init() {
    super.init();
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.permissions.focus();
  }

  selectPermission(items: any[] | Permission[]) {
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
