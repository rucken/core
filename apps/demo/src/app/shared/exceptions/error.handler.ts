import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MessageModalService } from '@rucken/web';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private _injector: Injector,
    private _ngZone: NgZone
  ) {
  }
  handleError(error) {
    this._ngZone.run(() => {
      const message = error.message ? error.message : (error && error.toString ? error.toString() : error);
      const messageModalService = this._injector.get(MessageModalService);
      messageModalService.error({
        error: message
      }).subscribe();
    });
  }
}
