import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { BasePageComponent } from './../../base/base-page/base-page.component';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '@rucken/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent extends BasePageComponent {

  readme = '';

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sharedService: SharedService
  ) {
    super(accountService, app, translateService, activatedRoute, router, sharedService);
    this.readme = this.readme; // require('html-loader!markdown-loader!./../../../README.md');
  }
}
