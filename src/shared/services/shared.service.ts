import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class SharedService {
  constructor(public app: AppService, public translateService: TranslateService) {
    app.onSetTranslateService.subscribe(
      (event: TranslateService) => {
        if (
          translateService &&
          translateService.store &&
          app && app.translateService && app.translateService.store
        ) {
          translateService.store = app.translateService.store;
        }
      }
    );
  }
}
