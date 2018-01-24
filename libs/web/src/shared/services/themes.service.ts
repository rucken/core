import { Injectable } from '@angular/core';
import { Theme, ThemesService } from '@rucken/core';
import { PLATFORM_ID, Inject, Injector } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class WebThemesService extends ThemesService {

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    public injector: Injector
  ) {
    super(injector);
  }

  initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (
        localStorage !== null &&
        localStorage.getItem('theme') !== null &&
        (localStorage.getItem('theme') as string).indexOf('/3/') !== -1
      ) {
        this.setTheme(new Theme({ url: localStorage.getItem('theme'), name: 'User theme' }));
      }
    }
  }
  setTheme(theme: Theme) {
    if (!theme.url || theme.pk === this.getCurrentTheme().pk) {
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      const links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (
          link &&
          link.getAttribute('rel') &&
          (link.getAttribute('rel') as string).indexOf('style') !== -1 &&
          link.getAttribute('title') &&
          link.getAttribute('title') === 'bootstrap'
        ) {
          link.setAttribute('href', theme.url);
          localStorage.setItem('theme', theme.url);
        }
      }
    }
  }
  getCurrentTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (
          link &&
          link.getAttribute('rel') &&
          (link.getAttribute('rel') as string).indexOf('style') !== -1 &&
          link.getAttribute('title') &&
          (link.getAttribute('title') as string) === 'bootstrap'
        ) {
          for (let j = 0; j < this.items.length; j++) {
            if (link.getAttribute('href') === this.items[j].url) {
              return this.items[j];
            }
          }
        }
      }
    }
    return new Theme();
  }
}
