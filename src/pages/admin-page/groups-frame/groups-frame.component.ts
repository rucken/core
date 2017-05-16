import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './../../../shared/account.service';
import { AppService } from './../../../shared/app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';

@Component({
  selector: 'groups-frame',
  templateUrl: './groups-frame.component.html',
  styleUrls: ['./groups-frame.component.scss']
})

export class GroupsFrameComponent extends BaseFrameComponent {

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
