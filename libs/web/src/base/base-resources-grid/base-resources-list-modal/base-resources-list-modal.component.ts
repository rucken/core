import { Component, Input } from '@angular/core';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'base-resources-list-modal',
  template: ''
})
export class BaseResourceListModalComponent extends BaseModalComponent {

  @Input()
  readonly? = false;
  @Input()
  hardReadonly? = false;

  item: any = {};
  items: any[] = [];
  modelMeta: any = {};
}
