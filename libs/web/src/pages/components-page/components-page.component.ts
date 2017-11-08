import { Component, ViewEncapsulation } from '@angular/core';

import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'components-page',
  templateUrl: './components-page.component.html',
  styleUrls: ['./components-page.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class ComponentsPageComponent extends BasePageComponent {

}
