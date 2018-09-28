import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'content-types-frame',
  templateUrl: './content-types-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypesFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
