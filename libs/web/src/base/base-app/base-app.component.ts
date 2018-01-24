import 'moment/locale/ru';

import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { RuckenCoreRuI18n } from '@rucken/core';
import { translate } from '@rucken/core';
import * as lodashImported from 'lodash'; const _ = lodashImported;
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { RuckenWebRuI18n } from './../../i18n/ru.i18n';
import { AlertModalComponent } from './../../modals/alert-modal/alert-modal.component';
import { BaseComponent } from './../base-component/base-component.component';

@Component({
  selector: 'base-app-root',
  templateUrl: './base-app.component.html',
  entryComponents: [AlertModalComponent]
})
export class BaseAppComponent extends BaseComponent {

  languages = [{
    code: 'ru',
    title: translate('Russian'),
    dic: _.merge(RuckenCoreRuI18n, RuckenWebRuI18n)
  }, {
    code: 'en',
    title: translate('English'),
    dic: null
  }];
  currentLang?: string;
  defaultLang = 'en';
  autoLoadLang = true;
  errorModalOpened = false;
  fullAccess = false;

  constructor(
    public injector: Injector,
    public viewContainerRef: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
  ) {
    super(injector);
  }
  afterCreate() {
    super.afterCreate();
    // You need this small hack in order to catch application root view container ref
    this.app.viewContainerRef = this.viewContainerRef;
    this.app.component = this;
    this.app.translateService = this.translateService;
    if (this.autoLoadLang === true) {
      this.loadLang();
    }
  }
  // todo: move to app service
  loadLang() {
    this.translateService.addLangs(this.languages.map(lang => lang.code));
    this.translateService.setDefaultLang(this.defaultLang);
    this.languages.filter(lang => lang.dic).map((lang: any) => this.translateService.setTranslation(lang.code, lang.dic));
    const browserLang: string = this.translateService.getBrowserLang();
    if (this.languages.filter(lang => lang.code === browserLang).length > 0 && !this.currentLang) {
      this.currentLanguage = browserLang;
    } else {
      this.currentLanguage = this.currentLang ? this.currentLang : 'en';
    }
  }
  get currentLanguage() {
    return this.translateService.currentLang;
  }
  set currentLanguage(lang: string) {
    this.translateService.use(lang);
  }
  showErrorModal(message: string, title?: string, size?: string): EventEmitter<any> {
    if (this.errorModalOpened) {
      return new EventEmitter<any>();
    }
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = translate('Error');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.name = 'error';
    alert.text = title;
    alert.message = message;
    alert.size = size;
    alert.buttonText = translate('Close');
    alert.modal.show();
    this.errorModalOpened = true;
    alert.onClose.subscribe(() => this.errorModalOpened = false);
    return alert.onClose;
  }
  showInfoModal(message: string, title?: string, size?: string): EventEmitter<any> {
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = translate('Info');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.name = 'error';
    alert.text = title;
    alert.message = message;
    alert.messageClass = '';
    alert.size = size;
    alert.buttonClass = 'btn-primary';
    alert.buttonText = translate('OK');
    alert.modal.show();
    return alert.onClose;
  }
  showContentModal(content: string, title?: string, size?: string): EventEmitter<any> {
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = translate('Info');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.focused = false;
    alert.name = 'error';
    alert.text = title;
    alert.content = content;
    alert.messageClass = '';
    alert.size = size;
    alert.buttonClass = 'btn-primary';
    alert.buttonText = translate('OK');
    alert.modal.show();
    return alert.onClose;
  }
}
