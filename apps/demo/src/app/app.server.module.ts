import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AuthService, LangService, STORAGE_CONFIG_TOKEN, TokenService, UniversalStorage } from '@rucken/core';
import { ThemesService } from '@rucken/web';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { initializeServerApp } from './utils/initialize-server-app';

@NgModule({
  imports: [
    FontAwesomeModule,
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: STORAGE_CONFIG_TOKEN,
      useClass: UniversalStorage
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeServerApp,
      multi: true,
      deps: [AuthService, TokenService, ThemesService, LangService]
    }
  ]
})
export class AppServerModule {}
