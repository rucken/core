import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppService } from './app.service';

@Injectable()
export class SharedService {
  constructor(public app: AppService, public translateService: TranslateService) {

  }
  linkTranslateService() {
    if (
      this.translateService &&
      this.translateService.store &&
      this.app && this.app.translateService && this.app.translateService.store &&
      this.translateService.getLangs().length !== this.app.translateService.getLangs().length
    ) {
      this.translateService.store = this.app.translateService.store;
      this.translateService.use(this.app.translateService.currentLang);
    }
  }
}
