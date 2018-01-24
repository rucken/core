import { Component, Input } from '@angular/core';

import { BaseModalComponent } from './../../base-modal/base-modal.component';

@Component({
  selector: 'base-resource-modal',
  template: ''
})
export class BaseResourceModalComponent extends BaseModalComponent {

  @Input()
  readonly?= false;
  @Input()
  item: any = {};
  @Input()
  modelMeta: any = {};
}
