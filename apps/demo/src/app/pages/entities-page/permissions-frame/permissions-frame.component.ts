import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'permissions-frame',
  templateUrl: './permissions-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
