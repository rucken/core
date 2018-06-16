import { AccountConfig, AccountService, TokenService } from '@rucken/core';
import { environment } from '../../../environments/environment';

export function initializeApp(
    accountService: AccountService,
    accountConfig: AccountConfig,
    tokenService: TokenService
) {
    accountService.repository.useRest({
        apiUrl: environment.apiUrl,
        ...accountConfig,
        pluralName: environment.type === 'mockapi' ? 'account/1' : 'account'
    });
    return () => new Promise((resolve, reject) =>
        accountService.initializeApp().then(_ =>
            tokenService.initializeApp().then(__ => {
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
    );
}
