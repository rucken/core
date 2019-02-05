import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'auth-empty-page',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthEmptyPageComponent {
  constructor() {}
}
