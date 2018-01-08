import { Component, Input } from '@angular/core';

import { BaseComponent } from '../../base/base-component/base-component.component';

@Component({
  selector: 'error-frame',
  templateUrl: './error-frame.component.html'
})

export class ErrorFrameComponent extends BaseComponent {

  @Input()
  message: string;
}
