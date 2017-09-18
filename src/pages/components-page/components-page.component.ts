import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './../../shared/services/account.service';
import { AppService } from './../../shared/services/app.service';
import { BasePageComponent } from './../../base/base-page/base-page.component';
import { SharedService } from './../../shared/services/shared.service';

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
    public router: Router,
    public sharedService: SharedService
  ) {
    super(accountService, app, translateService, activatedRoute, router, sharedService);
  }
}
