import { BaseModalComponent } from './../../base-modal/base-modal.component';
import { Input, EventEmitter, Output, Component } from '@angular/core';


@Component({
  selector: 'base-resources-list-modal',
  template: ''
})
export class BaseResourceListModalComponent extends BaseModalComponent {

  @Input()
  readonly = false;
  @Input()
  hardReadonly = false;
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
