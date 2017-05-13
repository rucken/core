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
import { BaseComponent } from '../../../controls/base-component/base-component.component';

export class ResourceSelectInputComponent extends BaseComponent {
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

  public items: any[];
  public cachedResourcesService: any;
  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: ResourceSelectInputConfig
  ) {
    super();
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
  init() {
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
    super.init();
    if (this.select && this.loadAll) {
      this.search();
    }
  }
  search() {
    const filter: any = {};
    this.cachedResourcesService.ignoreCache = true;
    this.cachedResourcesService.loadAll('', filter);
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
