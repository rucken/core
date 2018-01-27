import { Component, Injector } from '@angular/core';
import { HomePageComponent } from '@rucken/web';

@Component({
  selector: 'demo-home-page',
  templateUrl: './home-page.component.html'
})
export class DemoHomePageComponent extends HomePageComponent {

  afterCreate() {
    super.afterCreate();
    const readme = require('html-loader!markdown-loader!./../../../../../../README.md');
    this.readme = readme.replace('<h1 id="rucken">rucken</h1>', '');
  }
}
