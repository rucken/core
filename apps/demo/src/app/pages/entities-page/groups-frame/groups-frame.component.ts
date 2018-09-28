import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'groups-frame',
  templateUrl: './groups-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
