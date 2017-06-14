import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './../../shared/account.service';
import { AppService } from './../../shared/app.service';
import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'components-page',
  templateUrl: './components-page.component.html',
  styleUrls: ['./components-page.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class ComponentsPageComponent extends BasePageComponent {

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
