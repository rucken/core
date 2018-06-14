import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AccountModule, AppStorage, TokenModule, UniversalStorage } from '@rucken/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    NgxPermissionsModule.forRoot(),
    TokenModule.forRoot({
      withoutTokenUrls: [
        '/api/account/info',
        '/api/account/login',
        ...(environment.type === 'mockapi' ? ['/'] : [])
      ]
    }),
    AccountModule.forRoot(),
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
    }
  ]
})
export class AppServerModule {
  static forRoot() {

  }
}
