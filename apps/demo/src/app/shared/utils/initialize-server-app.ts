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
              const token = tokenService.getCurrent();
              if (token && !tokenService.checkTokenHasExpired(token)) {
                if (!authService.getCurrent()) {
                  authService.info(token).subscribe(
                    data => {
                      authService.setCurrent(data.user);
                      resolve();
                    },
                    error => {
                      authService.setCurrent(undefined);
                      resolve();
                    }
                  );
                } else {
                  resolve();
                }
              } else {
                tokenService.setCurrent(undefined);
                authService.setCurrent(undefined);
                resolve();
              }
            });
          });
        });
      });
    });
}
