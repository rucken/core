import 'moment/locale/ru';

import { Component, ComponentFactoryResolver, EventEmitter, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { RuckenCoreRuI18n } from '@rucken/core';
import { translate } from '@rucken/core';
import * as _ from 'lodash';
import * as moment from 'moment/moment';

import { SharedService } from '../../shared/services/shared.service';
import { RuckenWebRuI18n } from './../../i18n/ru.i18n';
import { AlertModalComponent } from './../../modals/alert-modal/alert-modal.component';
import { BaseComponent } from './../base-component/base-component.component';

@Component({
  selector: 'base-app-root',
  templateUrl: './base-app.component.html',
  styleUrls: ['./base-app.component.scss'],
  entryComponents: [AlertModalComponent],
  encapsulation: ViewEncapsulation.None
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
  }]
  currentLang: string = null;
  defaultLang = 'en';
  autoLoadLang = true;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService,
    public sharedService: SharedService
  ) {
    super();
  }
  afterCreate() {
    // You need this small hack in order to catch application root view container ref
    this.app.viewContainerRef = this.viewContainerRef;
    this.app.component = this;
    this.app.translateService = this.translateService;
    if (this.autoLoadLang === true) {
      this.loadLang();
    }
    this.sharedService.linkTranslateService();
  }
  loadLang() {
    this.translateService.addLangs(this.languages.map(lang => lang.code));
    this.translateService.setDefaultLang(this.defaultLang);
    this.languages.filter(lang => lang.dic).map(lang => this.translateService.setTranslation(lang.code, lang.dic));
    const browserLang: string = this.translateService.getBrowserLang();
    if (this.languages.filter(lang => lang.code === browserLang).length > 0 && !this.currentLang) {
      this.currentLanguage = browserLang;
    } else {
      this.currentLanguage = this.currentLang;
    }
    this.sharedService.linkTranslateService();
  }
  get currentLanguage() {
    return this.translateService.currentLang;
  }
  set currentLanguage(lang: string) {
    moment.locale(lang);
    this.translateService.use(lang);
  }
  showErrorModal(message: string, title?: string, size?: string): EventEmitter<any> {
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = this.translateService.instant('Error');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.name = 'error';
    alert.text = title;
    alert.message = message;
    alert.size = size;
    alert.buttonText = this.translateService.instant('Close');
    alert.modal.show();
    return alert.onClose;
  }
  showInfoModal(message: string, title?: string, size?: string): EventEmitter<any> {
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = this.translateService.instant('Info');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.name = 'error';
    alert.text = title;
    alert.message = message;
    alert.messageClass = '';
    alert.size = size;
    alert.buttonClass = 'btn-primary';
    alert.buttonText = this.translateService.instant('ОК');
    alert.modal.show();
    return alert.onClose;
  }
  showContentModal(content: string, title?: string, size?: string): EventEmitter<any> {
    if (size === undefined) {
      size = 'md';
    }
    if (title === undefined) {
      title = this.translateService.instant('Info');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.focused = false;
    alert.name = 'error';
    alert.text = title;
    alert.content = content;
    alert.messageClass = '';
    alert.size = size;
    alert.buttonClass = 'btn-primary';
    alert.buttonText = this.translateService.instant('ОК');
    alert.modal.show();
    return alert.onClose;
  }
}
