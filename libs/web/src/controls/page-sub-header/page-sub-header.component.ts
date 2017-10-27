import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'page-sub-header',
  templateUrl: './page-sub-header.component.html',
  styleUrls: ['./page-sub-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageSubHeaderComponent extends BaseComponent {
  @Input()
  title: string;
}
