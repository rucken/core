import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'users-frame',
  templateUrl: './users-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
