import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AppService } from '../shared/app.service';
import { RuckenRuI18n } from '../i18n/ru.i18n';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { EventEmitter, Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../controls/base-component/base-component.component';

export class AppComponent extends BaseComponent {
  @Input()
  autoLoadLang?: boolean;
  public constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    // You need this small hack in order to catch application root view container ref
    app.viewContainerRef = viewContainerRef;
    app.component = this;
    app.translate = translateService;
  }
  loadLang() {
    this.translateService.addLangs(['en', 'ru']);
    this.translateService.setDefaultLang('en');
    this.translateService.setTranslation('ru', _.merge(RuckenRuI18n));
    const browserLang: string = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }
  init() {
    if (this.autoLoadLang === undefined || this.autoLoadLang === true) {
      this.loadLang();
    }
  }
  showErrorModal(message: string, title?: string): EventEmitter<any> {
    if (title === undefined) {
      title = this.translateService.instant('Error');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
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
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.text = title;
    alert.message = message;
    alert.messageClass = '';
    alert.buttonClass = 'btn-primary';
    alert.buttonText = this.translateService.instant('ОК');
    alert.modal.show();
    return alert.onClose;
  }
  showContentModal(content: string, title?: string): EventEmitter<any> {
    if (title === undefined) {
      title = this.translateService.instant('Info');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.text = title;
    alert.content = content;
    alert.messageClass = '';
    alert.size = 'md';
    alert.buttonClass = 'btn-primary';
    alert.buttonText = this.translateService.instant('ОК');
    alert.modal.show();
    return alert.onClose;
  }
}
