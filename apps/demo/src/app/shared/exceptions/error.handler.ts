import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, Inject, Injectable, Injector, NgZone, PLATFORM_ID } from '@angular/core';
import { ModalsService } from '@rucken/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private _injector: Injector, private _ngZone: NgZone, @Inject(PLATFORM_ID) private _platformId: Object) {}
  handleError(error) {
    if (isPlatformBrowser(this._platformId)) {
      this._ngZone.run(() => {
        const message = error.message ? error.message : error && error.toString ? error.toString() : error;
        const modalsService = this._injector.get(ModalsService);
        modalsService.error({ error: message });
      });
    } else {
      console.log(error);
    }
  }
}
