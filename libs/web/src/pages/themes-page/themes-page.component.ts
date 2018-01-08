import { takeUntil } from 'rxjs/operators';

import { Component, Injector } from '@angular/core';
import { ThemesService } from '@rucken/core';
import { Theme } from '@rucken/core';

import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html'
})

export class ThemesPageComponent extends BasePageComponent {

  items: any[] | Theme[];

  themService: ThemesService;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.themService = injector.get(ThemesService);
  }

  init() {
    super.init();
    this.themService.items$.pipe(takeUntil(this.destroyed$)).subscribe(
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
