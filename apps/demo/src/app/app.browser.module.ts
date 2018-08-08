import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import {
  STORAGE_CONFIG_TOKEN,
  BrowserStorage,
  AuthService,
  TokenService
} from '@rucken/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { initializeApp } from './shared/utils/initialize-app';
import { ThemesService } from '@rucken/web';

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'demo' }), AppModule],
  providers: [
    {
      provide: REQUEST,
      useFactory: () => {
        return { headers: { cookie: document.cookie } };
      }
    },
    { provide: STORAGE_CONFIG_TOKEN, useClass: BrowserStorage },
    { provide: 'ORIGIN_URL', useValue: location.origin },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService, TokenService, ThemesService]
    }
  ]
})
export class AppBrowserModule {
  static forRoot() {}
}
