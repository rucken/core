import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../../shared/models/user.model';
import { AccountService } from './../../../shared/services/account.service';
import { AppService } from './../../../shared/services/app.service';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
  }
  get readonly() {
    return !this.account || !this.account.checkPermissions(['change_controls']);
  }
}
