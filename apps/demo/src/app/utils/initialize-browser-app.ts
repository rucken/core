import { LangService, TokenService } from '@rucken/core';
import { ThemesService } from '@rucken/web';

export function initializeBrowserApp(
  tokenService: TokenService,
  themesService: ThemesService,
  langService: LangService
) {
  return () =>
    new Promise((resolve, reject) => {
      langService.initializeApp().then(_ => {
        themesService.initializeApp().then(__ => {
          tokenService.initializeApp().then(___ => {
            resolve();
          });
        });
      });
    });
}
