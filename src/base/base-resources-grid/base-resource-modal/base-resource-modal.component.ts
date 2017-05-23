import { BaseModalComponent } from './../../base-modal/base-modal.component';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'base-resource-modal',
  template: ''
})
export class BaseResourceModalComponent extends BaseModalComponent {

  @Input()
  readonly = false;
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
