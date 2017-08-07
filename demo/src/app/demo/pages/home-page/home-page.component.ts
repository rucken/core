import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService, AccountService, BasePageComponent } from './../../../../../../src';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent extends BasePageComponent {

  constructor(
    public sanitizer: DomSanitizer,
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
    const readme = require('html-loader!markdown-loader!./../../../../../../README.md');
    this.readme = this.safeHtml(readme.replace('<h1 id="rucken">rucken</h1>', ''))
  }
}
