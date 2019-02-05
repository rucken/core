import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BindIoInner } from 'ngx-bind-io';

declare var require: any;

@BindIoInner()
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public readme = require('html-loader!markdown-loader!./../../../../../../README.md').replace(
    '<h1 id="rucken">rucken</h1>',
    ''
  );
  title$: Observable<string>;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.title$ = this._activatedRoute.data.pipe(map(data => data && data.meta && data.meta.title));
  }
}
