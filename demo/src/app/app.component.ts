import { AppService, AlertModalComponent, BaseAppComponent } from './../../../src';
import { Component, ViewContainerRef, ComponentFactoryResolver, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'demo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [AlertModalComponent],
  encapsulation: ViewEncapsulation.None
})
export class DemoAppComponent extends BaseAppComponent {

  pleaseWaitVisible = false;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService,
    public router: Router
  ) {
    super(viewContainerRef, app, resolver, translateService);

    router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        if (window['showPleaseWait']) {
          this.pleaseWaitVisible = true;
          setTimeout(() => {
            if (!this.pleaseWaitVisible) {
              return;
            }
            window['showPleaseWait'](this.translateService.instant('Loading...'));
          }, 500);
        }
      }
      if (evt instanceof NavigationEnd) {
        this.pleaseWaitVisible = false;
        document.body.scrollTop = 0;
        if (window && window['loading_screen'] && window['loading_screen'].finish !== false) {
          window['loading_screen'].finish();
        }
      }
    });
  }
  init() {
    super.init();
    if (window && window['loading_screen'] && window['loading_screen'].finish !== false) {
      window['loading_screen'].finish();
      this.pleaseWaitVisible = false;
    }
  }
}
