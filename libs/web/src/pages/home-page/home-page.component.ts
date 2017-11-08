import { Component } from '@angular/core';

import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent extends BasePageComponent {

  readme = '';

  afterCreate() {
    super.afterCreate();
    this.readme = this.readme; // require('html-loader!markdown-loader!./../../../README.md');
  }
}
