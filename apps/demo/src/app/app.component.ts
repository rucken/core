import { Component, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RuckenCoreRuI18n, translate } from '@rucken/core';
import { AlertModalComponent, BaseAppComponent, RuckenWebRuI18n } from '@rucken/web';
import * as lodashImported from 'lodash'; const _ = lodashImported;
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { enGb, ru } from 'ngx-bootstrap/locale';
import { takeUntil } from 'rxjs/operators';

import { DemoRuI18n } from './i18n/ru.i18n';

import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

defineLocale('ru', ru);
defineLocale('en', enGb);

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  entryComponents: [AlertModalComponent]
})
export class DemoAppComponent extends BaseAppComponent {

  languages = [{
    code: 'ru',
    title: translate('Russian'),
    dic: _.merge(RuckenCoreRuI18n, RuckenWebRuI18n, DemoRuI18n)
  }, {
    code: 'en',
    title: translate('English'),
    dic: null
  }];

  currentLang = 'en';

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    public injector: Injector,
    public viewContainerRef: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public router: Router
  ) {
    super(injector, viewContainerRef, resolver);
    router.events.pipe(takeUntil(this.destroyed$)).subscribe((evt) => {
      if (isPlatformBrowser(this.platformId)) {
        const doc = (document as any);
        if (doc && evt instanceof NavigationEnd) {
          doc.body.scrollTop = 0;
        }
      }
    });
  }
}
