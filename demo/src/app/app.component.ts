import { AppService, AlertModalComponent, AppComponent, RuckenRuI18n } from '../../../dist';
import { Component, ViewContainerRef, ComponentFactoryResolver, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
export class DemoAppComponent extends AppComponent {
  @Input()
  autoLoadLang?: boolean = true;

  public pleaseWaitVisible: boolean = false;

  public constructor(
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
          }, 300);
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
    if (window && window['loading_screen'] && window['loading_screen'].finish !== false) {
      window['loading_screen'].finish();
      this.pleaseWaitVisible = false;
    }
  }
  loadLang() {
    this.translateService.addLangs(["en", "ru"]);
    this.translateService.setDefaultLang('en');
    this.translateService.setTranslation('ru', _.merge(RuckenRuI18n));
    let browserLang: string = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|ru/) ? browserLang : 'ru');
  }
}
