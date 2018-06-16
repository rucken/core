import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppStorage, UniversalStorage, AccountService, AccountConfig, TokenService } from '@rucken/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { initializeApp } from './shared/utils/initialize-app';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: AppStorage, useClass: UniversalStorage
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [
        AccountService,
        AccountConfig,
        TokenService
      ]
    }
  ]
})
export class AppServerModule {
  static forRoot() {
  }
}
