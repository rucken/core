import { AuthService, LangService, TokenService } from '@rucken/core';
import { ThemesService } from '@rucken/web';

export function initializeApp(
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
              const token = tokenService.current;
              if (token && !tokenService.tokenHasExpired(token)) {
                if (!authService.current) {
                  authService.info(token).subscribe(
                    data => {
                      authService.current = data.user;
                      resolve();
                    },
                    error => {
                      authService.current = undefined;
                      resolve();
                    }
                  );
                } else {
                  resolve();
                }
              } else {
                tokenService.current = undefined;
                authService.current = undefined;
                resolve();
              }
            });
          });
        });
      });
    });
}
