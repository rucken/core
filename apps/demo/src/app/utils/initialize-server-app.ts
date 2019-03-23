import { AuthService, LangService, TokenService } from '@rucken/core';
import { ThemesService } from '@rucken/web';

export function initializeServerApp(
  authService: AuthService,
  tokenService: TokenService,
  themesService: ThemesService,
  langService: LangService
) {
  authService.initPermissions();
  return () =>
    new Promise((resolve, reject) => {
      langService.initializeApp().then(_ => {
        themesService.initializeApp().then(__ => {
          authService.initializeApp().then(___ => {
            tokenService.initializeApp().then(____ => {
              resolve();
            });
          });
        });
      });
    });
}
