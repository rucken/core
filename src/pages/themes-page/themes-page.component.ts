import { Theme } from '../../shared/models/theme.model';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/app.service';
import { ThemesService } from '../../shared/themes.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.scss']
})

export class ThemesPageComponent implements OnInit {
  public title: string;
  public items: Theme[];
  constructor(public app: AppService, public themesService: ThemesService,
    public translateService: TranslateService) {
    this.title = this.translateService.instant('Themes');
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.app.currentPageName = 'themes';
    this.app.currentPageTitle = this.title;
    this.themesService.items$.subscribe(
      (themes: Theme[]) => {
        console.log(themes);
        this.items = themes;
      }, (errors: any) => {
        this.items = [];
      });
    this.search();
  }
  changeTheme(theme: Theme) {
    this.themesService.setTheme(theme);
  }
  get currentTheme() {
    return this.themesService.getCurrentTheme();
  }
  search(ignoreCache?: boolean) {
    let filter: any = {};
    this.themesService.ignoreCache = ignoreCache;
    this.themesService.loadAll();
  }
}
