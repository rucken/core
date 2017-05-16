import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './../../../shared/account.service';
import { AppService } from './../../../shared/app.service';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'users-frame',
  templateUrl: './users-frame.component.html',
  styleUrls: ['./users-frame.component.scss']
})

export class UsersFrameComponent extends BaseFrameComponent {

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
