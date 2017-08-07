import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { BasePageComponent } from './../../base/base-page/base-page.component';
import { AccountService } from './../../shared/account.service';
import { AppService } from './../../shared/app.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent extends BasePageComponent {

  readme = '';

  constructor(
    public sanitizer: DomSanitizer,
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
    this.readme = this.safeHtml(this.readme); // require('html-loader!markdown-loader!./../../../README.md');
  }
}
