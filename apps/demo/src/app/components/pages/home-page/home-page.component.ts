import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  readme = require('html-loader!markdown-loader!./../../../../../../../README.md')
    .replace('<h1 id="rucken">rucken</h1>', '');

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
