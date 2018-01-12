import { Component } from '@angular/core';
import { User } from '@rucken/core';

import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';

@Component({
  selector: 'controls-frame',
  templateUrl: './controls-frame.component.html'
})
export class ControlsFrameComponent extends BaseFrameComponent {

  modelMeta: any = User.meta();
  rePassword: string;

  get readonly() {
    return !this.accessToChange;
  }
}
