import { AuthService, TokenService } from '@rucken/core';
import { environment } from '../../../environments/environment';
import { ThemesService } from '@rucken/web';

export function initializeApp(
  authService: AuthService,
  tokenService: TokenService,
  themesService: ThemesService
) {
  return () =>
    new Promise((resolve, reject) =>
      themesService.initializeApp().then(_ =>
        authService.initializeApp().then(__ =>
          tokenService.initializeApp().then(___ => {
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
          })
        )
      )
    );
}
