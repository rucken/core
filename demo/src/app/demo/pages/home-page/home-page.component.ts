import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService, AccountService, BasePageComponent } from './../../../../../../src';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent extends BasePageComponent {

  readme: string = require('html-loader!markdown-loader!./../../../../../../README.md');

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
  }
}
