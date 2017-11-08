import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';

@Injectable()
export class SharedService {
  
  app: AppService;
  translateService: TranslateService;

  constructor(
    public injector: Injector
  ) {
    this.app = injector.get(AppService);
    this.translateService = injector.get(TranslateService);
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
