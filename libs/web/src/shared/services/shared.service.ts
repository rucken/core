import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';

@Injectable()
export class SharedService {
  [key: string]: any;

  app: AppService;
  translateService: TranslateService;

  constructor(
    public injector: Injector
  ) {
    this.app = injector.get(AppService);
    this.translateService = injector.get(TranslateService);
  }
}
