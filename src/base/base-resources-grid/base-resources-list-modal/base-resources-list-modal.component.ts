import { BaseModalComponent } from '../../base-modal/base-modal.component';
import { Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../shared/models/user.model';


export class BaseResourceListModalComponent extends BaseModalComponent {

  @Input()
  readonly = false;
  @Input()
  hardReadonly = false;
  @Input()
  account: any | User = null;
  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();
  item: any = {};
  items: any[] = [];
  modelMeta: any = {};
  select() {
    this.onSave.emit(this);
    return false;
  }
}
