import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TextInputConfig } from './text-input.config';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment/moment';
import * as _ from 'lodash';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
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
  dateOptions?: INgxMyDpOptions;
  @Input()
  isNativeDateInput?: boolean;

  private _dateModel: any;

  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: TextInputConfig
  ) {
    super();
    if (this.isNativeDateInput === undefined) {
      this.isNativeDateInput = config.isNativeDateInput;
    }
    if (this.dateOptions === undefined) {
      this.dateOptions = config.dateOptions;
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = config.errorInTooltip;
    }
    if (this.maxlength === undefined) {
      this.maxlength = config.maxlength;
    }
    if (this.step === undefined) {
      this.step = config.step;
    }
  }
  init() {
    if (this.type === undefined) {
      this.type = 'text';
    }
    if (this.type === 'date' && this.inputFrameClass === undefined && !this.isNativeDateInput) {
      this.inputFrameClass = 'input-group';
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
        const numberMask = createNumberMask(this.config.currencyMask);
        this.type = 'text';
        this.mask.mask = numberMask;
      }
      if (this.type === 'phone') {
        this.type = 'text';
        this.mask = this.config.phoneMask;
      }
      if (this.type === 'date' && !this.isNativeDateInput) {
        this.mask = this.config.dateMask;
      }
    }
    super.init();
  }
  get dateModel() {
    if (!this._dateModel || !this._dateModel.jsdate) {
      const value = this.value;
      let date: any;
      try {
        date = moment(value, this.config.nativeInputDateFormat).toDate();
      } catch (err) {
        date = null;
      }
      if (!date || date === 'Invalid date' || _.isNaN(date.getFullYear())) {
        this._dateModel = undefined;
      } else {
        this._dateModel = {
          date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          }
        }
      }
    }
    return this._dateModel;
  }
  set dateModel(val: any) {
    if (val) {
      this._dateModel = val;
      this.value = this.config.nativeInputDateFormat.replace('YYYY', this._dateModel.date.year).replace('MM', this._dateModel.date.month).replace('DD', this._dateModel.date.day);
    } else {
      this.value = val;
    }
  }
  get value() {
    if (this.hardValue !== null) {
      return this.hardValue;
    }
    return this.model;
  }
  set value(val) {
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    this.model = val;
    this.modelChange.emit(this.model);
  }
}
