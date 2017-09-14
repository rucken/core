import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService, AccountService, BasePageComponent } from 'rucken';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'demo-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class DemoHomePageComponent extends BasePageComponent {

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
    const readme = require('html-loader!markdown-loader!./../../../../../../README.md');
    this.readme = readme.replace('<h1 id="rucken">rucken</h1>', '');
  }
}
