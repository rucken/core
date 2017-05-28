import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AppService } from './../../shared/app.service';
import { RuckenRuI18n } from './../../i18n/ru.i18n';
import { AlertModalComponent } from './../../modals/alert-modal/alert-modal.component';
import { EventEmitter, Component, Input, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from './../base-component/base-component.component';
import { translate } from '../../shared/utils';

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
    dic: _.merge(RuckenRuI18n)
  }, {
    code: 'en',
    title: translate('English'),
    dic: null
  }]
  currentLang = 'en';
  defaultLang = 'en';
  autoLoadLang = true;

  constructor(
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
    this.translateService.addLangs(this.languages.map(lang => lang.code));
    this.translateService.setDefaultLang(this.defaultLang);
    this.languages.filter(lang => lang.dic).map(lang => this.translateService.setTranslation(lang.code, lang.dic));
    const browserLang: string = this.translateService.getBrowserLang();
    if (this.languages.filter(lang => lang.code === browserLang).length > 0) {
      this.translateService.use(browserLang);
    } else {
      this.translateService.use(this.currentLang);
    }
  }
  init() {
    if (this.autoLoadLang === true) {
      this.loadLang();
    }
  }
  showErrorModal(message: string, title?: string): EventEmitter<any> {
    if (title === undefined) {
      title = this.translateService.instant('Error');
    }
    const alert: AlertModalComponent = this.app.modals(this.resolver).create(AlertModalComponent);
    alert.name = 'error';
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
    alert.name = 'error';
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
    alert.focused = false;
    alert.name = 'error';
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
