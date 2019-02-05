import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'apps/demo/src/environments/environment';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'users-frame',
  templateUrl: './users-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFrameComponent {
  public apiUrl = environment.apiUrl;
  parentTitle$: Observable<string>;
  title$: Observable<string>;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.parentTitle$ = this._activatedRoute.parent.parent.data.pipe(map(data => data && data.meta && data.meta.title));
    this.title$ = this._activatedRoute.data.pipe(map(data => data && data.meta && data.meta.title));
  }
}
