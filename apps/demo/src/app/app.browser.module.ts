import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { BrowserStorage, LangService, STORAGE_CONFIG_TOKEN, TokenService } from '@rucken/core';
import { ThemesService } from '@rucken/web';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { config } from './config/config';
import { initializeBrowserApp } from './utils/initialize-browser-app';
@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: config.app.id }), FontAwesomeModule, AppModule],
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
      useFactory: initializeBrowserApp,
      multi: true,
      deps: [TokenService, ThemesService, LangService]
    }
  ]
})
export class AppBrowserModule {}
