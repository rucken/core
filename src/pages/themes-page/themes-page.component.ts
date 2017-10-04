import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemesService } from '@rucken/core';
import { Theme } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';

import { SharedService } from '../../shared/services/shared.service';
import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.scss']
})

export class ThemesPageComponent extends BasePageComponent {

  items: any[] | Theme[];

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public themService: ThemesService,
    public router: Router,
    public sharedService: SharedService
  ) {
    super(accountService, app, translateService, activatedRoute, router, sharedService);
  }

  init() {
    super.init();
    this.themService.items$.subscribe(
      (themes: any[] | Theme[]) => {
        this.items = themes;
      }, (errors: any) => {
        this.items = [];
      });
    this.search();
  }
  changeTheme(theme: any | Theme) {
    this.themService.setTheme(theme);
  }
  get currentTheme() {
    return this.themService.getCurrentTheme();
  }
  search(ignoreCache?: boolean) {
    this.themService.ignoreCache = ignoreCache;
    this.themService.loadAll();
  }
}
