import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TextInputConfig } from './text-input.config';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { BaseComponent } from '../../base/base-component/base-component.component';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent extends BaseComponent {
  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'form-control';
  @Input()
  inputFrameClass?= '';

  @ViewChild('inputElement')
  inputElement: ElementRef;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;
  @Input()
  type = 'text';
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

  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: TextInputConfig
  ) {
    super();
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
        this.mask.mask = ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      }
    }
    super.init();
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
