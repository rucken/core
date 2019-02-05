import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'auth-empty-page',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthEmptyPageComponent {
  constructor() {}
}
