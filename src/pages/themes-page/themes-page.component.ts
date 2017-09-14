import { Component } from '@angular/core';
import { ThemesService } from './../../shared/services/themes.service';
import { Theme } from './../../shared/models/theme.model';
import { BasePageComponent } from './../../base/base-page/base-page.component';
import { AccountService } from './../../shared/services/account.service';
import { AppService } from './../../shared/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
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
