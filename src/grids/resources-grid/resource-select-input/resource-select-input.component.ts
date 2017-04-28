import { isSimpleTemplateString } from 'codelyzer/util/utils';
import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { AppService } from './../../../shared/app.service';
import { AccountService } from './../../../shared/account.service';
import { User } from './../../../shared/models/user.model';
import { ResouceEnumStatus } from './../../../shared/enums/resource.enums';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ResourceSelectInputConfig } from './resource-select-input.config';

export class ResourceSelectInputComponent implements OnInit {
  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?: string;
  @ViewChild('inputElement')
  inputElement: any;
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?: string;
  @Input()
  focused = false;
  @Input()
  readonly = false;
  @Input()
  hardReadonly = false;
  @Input()
  inputReadonly = true;
  @Input()
  name: string;
  @Input()
  placeholder = '';
  @Input()
  title = '';
  @Input()
  model: any = {};
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  modelAsString = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  hardValue: any = null;
  @Input()
  select: boolean;
  @Input()
  width: string = null;
  @Input()
  loadAll = true;

  @ViewChild('tooltip')
  public tooltip: TooltipDirective;
  @Input()
  public tooltipEnable: boolean;
  @Input()
  public tooltipText = '';
  @Input()
  public tooltipPlacement = 'bottom';
  @Input()
  public tooltipTriggers = 'hover focus';

  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  public items: any[];
  public cachedResourcesService: any;
  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: ResourceSelectInputConfig
  ) {
    if (this.select === undefined) {
      this.select = config.select;
    }
    if (this.lookupIcon === undefined) {
      this.lookupIcon = config.lookupIcon;
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = config.errorInTooltip;
    }
  }
  showTooltip() {
    const tooltip: any = this.tooltip;
    if (!tooltip._tooltip || !tooltip._tooltip._componentRef || !tooltip._tooltip._componentRef.location.nativeElement) {
      return;
    }
    const tooltipInner: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-inner')[0];
    const tooltipArrow: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-arrow')[0];
    if (this.inputElement.inputElement) {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
    } else {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
    }
  }
  safeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  get errorMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.errorsValue && this.errorsValue[this.name]) {
      for (let i = 0; i < this.errorsValue[this.name].length; i++) {
        if (this.errorsValue[this.name][i]) {
          text = this.translateService.instant(this.errorsValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  get infoMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.infoValue && this.infoValue[this.name]) {
      for (let i = 0; i < this.infoValue[this.name].length; i++) {
        if (this.infoValue[this.name][i]) {
          text = this.translateService.instant(this.infoValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  ngOnInit() {
    if (this.inputElement) {
      this.inputElement.hardValue = this.hardValue;
    }
    this.cachedResourcesService.items$.subscribe(
      (pageTypes: any[]) => {
        this.items = pageTypes;
        if (this.inputElement) {
          this.inputElement.items = this.items;
          this.inputElement.init();
        }
      }, (errors: any) => {
        this.items = [];
      });
    this.errors.subscribe((data: any) => {
      this.errorsValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
      this.tooltipText = this.errorMessage;
    });
    this.info.subscribe((data: any) => {
      this.infoValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
      this.tooltipText = this.infoMessage;
    });
    this.init();
  }
  init() {
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
    if (this.select && this.loadAll) {
      this.cachedResourcesService.loadAll();
    }
  }
  focus() {
    if (this.inputElement && this.inputElement.inputElement) {
      this.inputElement.inputElement.focus();
    } else {
      if (this.inputElement && this.inputElement.nativeElement) {
        this.inputElement.nativeElement.focus();
      }
    }
  }
  get value() {
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
  get valueAsString() {
    return this.modelAsString;
  }
  set valueAsString(val) {
    this.modelAsString = val;
    this.modelAsStringChange.emit(this.modelAsString);
  }
  get statusListMessage() {
    if (this.cachedResourcesService.statusList === ResouceEnumStatus.Ok) {
      return '';
    } else {
      return this.cachedResourcesService.statusListMessage;
    }
  }
}
