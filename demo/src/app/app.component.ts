import { AppService, AlertModalComponent, AppComponent, RuckenRuI18n } from '../../../dist';
import { Component, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'demo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [AlertModalComponent]
})
export class DemoAppComponent extends AppComponent {
  @Input()
  autoLoadLang?: boolean = true;
  public constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(viewContainerRef, app, resolver, translateService);
  }
  init() {
    if (window && window['loading_screen'] && window['loading_screen'].finish !== false) {
      window['loading_screen'].finish();
    } else {
      window['loading_screen'] = false;
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
