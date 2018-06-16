import { AccountConfig, AccountService, TokenService } from '@rucken/core';
import { environment } from '../../../environments/environment';
import { ThemesService } from '@rucken/web';

export function initializeApp(
    accountService: AccountService,
    accountConfig: AccountConfig,
    tokenService: TokenService,
    themesService: ThemesService
) {
    accountService.repository.useRest({
        apiUrl: environment.apiUrl,
        ...accountConfig,
        pluralName: environment.type === 'mockapi' ? 'account/1' : 'account'
    });
    return () => new Promise((resolve, reject) =>
        themesService.initializeApp().then(_ =>
            accountService.initializeApp().then(__ =>
                tokenService.initializeApp().then(___ => {
                    const token = tokenService.current;
                    if (token && !tokenService.tokenHasExpired(token)) {
                        if (!accountService.current) {
                            accountService.info(token).subscribe(
                                data => {
                                    tokenService.current = data.token;
                                    accountService.current = data.user;
                                    resolve();
                                },
                                error => {
                                    tokenService.current = undefined;
                                    accountService.current = undefined;
                                    resolve();
                                }
                            );
                        } else {
                            resolve();
                        }
                    } else {
                        tokenService.current = undefined;
                        accountService.current = undefined;
                        resolve();
                    }
                })
            )
        )
    );
}
