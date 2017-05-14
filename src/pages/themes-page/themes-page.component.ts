import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../shared/app.service';
import { ThemesService } from '../../shared/themes.service';
import { Theme } from '../../shared/models/theme.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.scss']
})

export class ThemesPageComponent implements OnInit {
  title: string;
  items: any[] | Theme[];
  constructor(
    public app: AppService,
    public themesService: ThemesService,
    public translateService: TranslateService
  ) {
    this.title = this.translateService.instant('Themes');
  }
  ngOnInit() {
    this.app.currentPageName = 'themes';
    this.app.currentPageTitle = this.title;
    this.themesService.items$.subscribe(
      (themes: any[] | Theme[]) => {
        this.items = themes;
      }, (errors: any) => {
        this.items = [];
      });
    this.search();
  }
  changeTheme(theme: any | Theme) {
    this.themesService.setTheme(theme);
  }
  get currentTheme() {
    return this.themesService.getCurrentTheme();
  }
  search(ignoreCache?: boolean) {
    this.themesService.ignoreCache = ignoreCache;
    this.themesService.loadAll();
  }
}
