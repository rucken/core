import { Component, ElementRef, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import * as lodashImported from 'lodash'; const _ = lodashImported;
import * as momentImported from 'moment'; const moment = momentImported;
import { getLocale } from 'ngx-bootstrap/bs-moment/locale/locales.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';

import { BaseComponent } from './../../base/base-component/base-component.component';
import { TextInputConfig } from './text-input.config';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html'
})

export class TextInputComponent extends BaseComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'form-control';
  @Input()
  inputFrameClass?: string;
  @Input()
  type: string;
  @Input()
  readonly = false;
  @Input()
  name = 'text';
  @Input()
  placeholder = '';
  @Input()
  title = '';
  @Input()
  model = '';
  @Input()
  hardValue: string = null;
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  maxlength: number;
  @Input()
  mask: any = { mask: false };
  @Input()
  step: string;
  @Input()
  min = '';
  @Input()
  max = '';
  @Input()
  minDate?: Date = null;
  @Input()
  maxDate?: Date = null;
  @Input()
  isNativeDateInput?: boolean;
  @Input()
  bsDatepickerConfig: any;

  private _dateValue: any;
  private _config: TextInputConfig;
  private _localeService: BsLocaleService;

  constructor(
    public injector: Injector,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(injector);
    this._config = injector.get(TextInputConfig);
    this._localeService = injector.get(BsLocaleService);
  }
  afterCreate() {
    if (this.isNativeDateInput === undefined) {
      this.isNativeDateInput = this._config.isNativeDateInput;
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = this._config.errorInTooltip;
    }
    if (this.maxlength === undefined) {
      this.maxlength = this._config.maxlength;
    }
    if (this.step === undefined) {
      this.step = this._config.step;
    }
    if (this.bsDatepickerConfig === undefined) {
      this.bsDatepickerConfig = this._config.bsDatepickerConfig;
    }
    this.translateService.onLangChange.subscribe(
      (langData: any) => {
        this.initLang(langData.lang);
      }
    );
  }
  initLang(lang: string) {
    this._localeService.use(lang);
    moment.locale(lang);
  }
  init() {
    if (this.type === undefined) {
      this.type = 'text';
    }
    if (this.inputFrameClass === undefined) {
      this.inputFrameClass = '';
    }
    if (this.mask.mask === false) {
      if (this.type === 'email') {
        this.type = 'text';
        this.mask.mask = emailMask;
      }
      if (this.type === 'currency') {
        const numberMask = createNumberMask(this._config.currencyMask);
        this.type = 'text';
        this.mask.mask = numberMask;
      }
      if (this.type === 'phone') {
        this.type = 'text';
        this.mask = this._config.phoneMask;
      }
    }
    super.init();
    this.changeDetectorRef.detectChanges();
    this.initLang(this.app.component.currentLanguage);
  }
  get dateValue() {
    if (this._dateValue === undefined) {
      this.setDateValueFromString(this.value);
    }
    return this._dateValue;
  }
  set dateValue(value: any) {
    this._dateValue = value;
    if (this.type === 'date') {
      this.value = this.getStringFromDateValue();
    }
  }
  get inputDateFormat(): any {
    const locale: any = getLocale(this._localeService.currentLocale);
    return locale._longDateFormat && locale._longDateFormat.L ? locale._longDateFormat.L : this._config.nativeInputDateFormat;
  }
  get inputDateMask(): any {
    const inputDateFormat = this.inputDateFormat;
    const inline = inputDateFormat.replace(new RegExp('DD', 'ig'), 'D').replace(new RegExp('MM', 'ig'), 'M').replace(new RegExp('YYYY', 'ig'), 'Y');
    let mask: any[] = [];
    inline.split('').forEach((ch: string) => {
      switch (ch) {
        case 'D': {
          mask = _.concat(mask, this._config.dateMask.day);
          break;
        }
        case 'M': {
          mask = _.concat(mask, this._config.dateMask.month);
          break;
        }
        case 'Y': {
          mask = _.concat(mask, this._config.dateMask.year);
          break;
        }
        default: {
          mask = _.concat(mask, [ch]);
          break;
        }
      }
    });
    return {
      mask: mask
    };
  }
  get value() {
    if (this.hardValue !== null) {
      return this.hardValue;
    }
    if (this.type === 'date' && !this.isNativeDateInput) {
      return moment(moment(this.model, this._config.nativeInputDateFormat).toDate()).format(this.inputDateFormat);
    }
    return this.model;
  }
  set value(value) {
    let newValue: any = value;
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    if (this.type === 'date' && !this.isNativeDateInput) {
      newValue = moment(moment(value, this.inputDateFormat).toDate()).format(this._config.nativeInputDateFormat);
    }
    if (newValue === 'Invalid date' && !this.model) {
      newValue = this.model;
    }
    if (this.model !== newValue) {
      this.model = newValue;
      this.modelChange.emit(this.model);
    }
  }
  getStringFromDateValue() {
    if (this._dateValue === undefined) {
      return '';
    }
    let value: string;
    value = '';
    try {
      value = moment(this._dateValue).format(this.inputDateFormat);
    } catch (err) {
      value = '';
    }
    if (value === 'Invalid date') {
      value = '';
    }
    return value;
  }
  setDateValueFromString(value: any) {
    try {
      value = moment(value, this.inputDateFormat).toDate();
    } catch (err) {
      value = null;
    }
    if (value === 'Invalid date') {
      value = null;
    }
    this._dateValue = value;
  }
}
