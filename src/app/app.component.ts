import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AppService } from '../shared/app.service';
import { CoreRuI18n } from '../i18n/ru.i18n';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { EventEmitter, Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export class AppComponent implements OnInit {
  @Input()
  autoLoadLang?: boolean;
  public constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    // You need this small hack in order to catch application root view container ref
    app.viewContainerRef = viewContainerRef;
    app.component = this;
  }
  loadLang() {
    this.translateService.addLangs(["en", "ru"]);
    this.translateService.setDefaultLang('en');
    this.translateService.setTranslation('ru', _.merge(CoreRuI18n));
    let browserLang: string = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }
  ngOnInit() {
    if (this.autoLoadLang === undefined || this.autoLoadLang === true) {
      this.loadLang();
    }
  }
  showErrorModal(message: string, title?: string): EventEmitter<any> {
    if (title === undefined) {
      title = this.translateService.instant('Error');
    }
    let alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.text = title;
    alert.message = message;
    alert.buttonText = this.translateService.instant('Close');
    alert.modal.show();
    return alert.onClose;
  }
  showInfoModal(message: string, title?: string): EventEmitter<any> {
    if (title === undefined) {
      title = this.translateService.instant('Info');
    }
    let alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.text = title;
    alert.message = message;
    alert.messageClass = '';
    alert.buttonClass = 'btn-primary';
    alert.buttonText = this.translateService.instant('ОК');
    alert.modal.show();
    return alert.onClose;
  }
}
