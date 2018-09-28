import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
