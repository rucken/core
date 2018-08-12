import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'auth-empty',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthEmptyComponent {
  constructor() {}
}
