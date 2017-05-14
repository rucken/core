import { BaseModalComponent } from './../../base-modal/base-modal.component';
import { Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../../shared/models/user.model';

export class BaseResourceModalComponent extends BaseModalComponent {

  @Input()
  readonly = false;
  @Input()
  account: any | User = null;
  @Input()
  item: any = {};
  @Input()
  modelMeta: any = {};
  @Output()
  onSave: EventEmitter<any>;

  save() {
    this.onSave.emit(this);
    return false;
  }
}
