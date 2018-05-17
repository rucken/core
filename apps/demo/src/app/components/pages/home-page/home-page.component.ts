import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  readme = environment.type === 'backend' ?
    require('html-loader!markdown-loader!./../../../../../../../../README.md') :
    require('html-loader!markdown-loader!./../../../../../../../README.md')
      .replace('<h1 id="todo">todo</h1>', '');

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
