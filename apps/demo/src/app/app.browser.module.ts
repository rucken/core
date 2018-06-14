import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AccountModule, AppStorage, CookieStorage, TokenModule, TransferHttpCacheModule } from '@rucken/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'demo' }),
        TransferHttpCacheModule.forRoot(),
        BrowserTransferStateModule,
        NgxPermissionsModule.forRoot(),
        TokenModule.forRoot({
            withoutTokenUrls: [
                '/api/account/info',
                '/api/account/login',
                ...(environment.type === 'mockapi' ? ['/'] : [])
            ]
        }),
        AccountModule.forRoot(),
        AppModule
    ],
    providers: [
        {
            provide: REQUEST, useFactory: () => {
                return { headers: { cookie: document.cookie } };
            }
        },
        { provide: AppStorage, useClass: CookieStorage },
        { provide: 'ORIGIN_URL', useValue: location.origin }
    ]
})
export class AppBrowserModule {
    static forRoot() {

    }
}
