import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheInterceptor } from './transfer-http-cache.interceptor';

/**
 * An NgModule used in conjunction with `ServerTransferHttpCacheModule` to transfer cached HTTP
 * calls from the server to the client application.
 */
@NgModule({
  imports: [BrowserTransferStateModule]
})
export class TransferHttpCacheModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TransferHttpCacheModule,
      providers: [
        TransferHttpCacheInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TransferHttpCacheInterceptor,
          multi: true
        }
      ]
    };
  }
}
