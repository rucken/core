import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';

import { SharedService } from '../../../shared/services/shared.service';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';

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
    public router: Router,
    public sharedService: SharedService
  ) {
    super(accountService, app, translateService, activatedRoute, router, sharedService);
  }
}
