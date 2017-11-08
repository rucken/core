import { Injectable } from '@angular/core';
import { Theme, ThemesService } from '@rucken/core';

@Injectable()
export class WebThemesService extends ThemesService {

  initTheme() {
    if (localStorage.getItem('theme') && localStorage.getItem('theme').indexOf('/3/') !== -1) {
      this.setTheme(new Theme({ url: localStorage.getItem('theme'), name: 'User theme' }));
    }
  }
  setTheme(theme: Theme) {
    if (!theme.url || theme.pk === this.getCurrentTheme().pk) {
      return;
    }
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.getAttribute('rel').indexOf('style') !== -1 && link.getAttribute('title')
        && link.getAttribute('title') === 'bootstrap') {
        link.setAttribute('href', theme.url);
        localStorage.setItem('theme', theme.url);
      }
    }
  }
  getCurrentTheme() {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.getAttribute('rel').indexOf('style') !== -1 && link.getAttribute('title')
        && link.getAttribute('title') === 'bootstrap') {
        for (let j = 0; j < this.items.length; j++) {
          if (link.getAttribute('href') === this.items[j].url) {
            return this.items[j];
          }
        }
      }
    }
    return new Theme();
  }
}
