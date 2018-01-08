import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Injector } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BaseComponent } from './../../base/base-component/base-component.component';
import { SelectInputConfig } from './select-input.config';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html'
})

export class SelectInputComponent extends BaseComponent {

  @ViewChild('tooltip')
  tooltip: TooltipDirective;
  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  debounceTime?: number;
  @Output()
  onChangeInputValue: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'form-control';
  @Input()
  inputFrameClass?= '';
  @Input()
  inFormGroup = true;
  @Input()
  readonly = false;
  @Input()
  name = 'select';
  @Input()
  placeholder = '';
  @Input()
  valueField: string;
  @Input()
  title: string;
  @Input()
  model: any;
  @Input()
  hardValue: any = null;
  @Input()
  titleField: string;
  @Input()
  inputTitleField: string;
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  width: string = null;
  @Input()
  set items(items: any[]) {
    this._items = items;
  }
  get items() {
    return this._items;
  }
  @Input()
  set textValue(textValue: string) {
    this._textValue = textValue;
    if (this._textValue === '') {
      this.value = null;
    }
  }
  get textValue() {
    return this._textValue;
  }

  config: SelectInputConfig;
  debouncer$: Subject<string>;

  private _textValue: string;
  private _items: any[] = [];
  private _showMe = false;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.debouncer$ = new Subject<string>();
    this.config = injector.get(SelectInputConfig);
  }
  afterCreate() {
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = this.config.errorInTooltip;
    }
    if (this.valueField === undefined) {
      this.valueField = this.config.valueField;
    }
    if (this.titleField === undefined) {
      this.titleField = this.config.titleField;
    }
    if (this.inputTitleField === undefined) {
      this.inputTitleField = this.config.inputTitleField;
    }
    if (this.debounceTime === undefined) {
      this.debounceTime = this.config.debounceTime;
    }
    this.debouncer$.pipe(debounceTime(this.debounceTime))
      .subscribe((value: string) => this.onChangeInputValue.emit(value));
  }
  get inputReadonly() {
    return this.onChangeInputValue.observers && this.onChangeInputValue.observers.length === 0;
  }
  get value() {
    return this.model;
  }
  set value(val: any) {
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    if (val && val[this.inputTitleField]) {
      this.textValue = val[this.inputTitleField];
      this.model = val;
    } else {
      // this.textValue = '';
      this.model = null;
    }
    this.debouncer$.next(this.textValue);
    this.modelChange.emit(this.model);
  }
  onTypeaheadNoResults(typeaheadNoResults: boolean) {
    if (typeaheadNoResults) {
      this.value = null;
    }
  }
  init() {
    if (this.hardValue) {
      this.value = this.hardValue;
    }
    this.value = this.value;
    super.init();
  }
  getTitle(item: any): SafeHtml | string {
    if (item && item[this.titleField]) {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.translateService.instant(item[this.titleField])
      );
    }
    if (item && item[this.inputTitleField]) {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.translateService.instant(item[this.inputTitleField])
      );
    }
    return '';
  }
  getInputTitle(item: any) {
    if (item && item[this.inputTitleField]) {
      return this.translateService.instant(item[this.inputTitleField]);
    }
    if (item && item[this.titleField]) {
      return this.translateService.instant(item[this.titleField]);
    }
    return '';
  }
}
