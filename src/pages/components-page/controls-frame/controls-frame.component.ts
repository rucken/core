import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@rucken/core';

@Component({
  selector: 'controls-frame',
  templateUrl: './controls-frame.component.html',
  styleUrls: ['./controls-frame.component.scss']
})
export class ControlsFrameComponent extends BaseFrameComponent {

  modelMeta: any = User.meta();
  rePassword: string;

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
  get readonly() {
    return !this.account || !this.account.checkPermissions(['change_controls']);
  }
}
