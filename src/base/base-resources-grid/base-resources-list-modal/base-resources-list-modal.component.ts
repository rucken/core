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

  item: any = {};
  items: any[] = [];
  modelMeta: any = {};
}
