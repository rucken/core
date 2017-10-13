import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NguiAutoCompleteComponent } from '@ngui/auto-complete';
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { Subject } from 'rxjs/Subject';

import { BaseComponent } from './../../base/base-component/base-component.component';
import { SelectInputConfig } from './select-input.config';
import { translate } from '@rucken/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class SelectInputComponent extends BaseComponent {

  @ViewChild('tooltip')
  tooltip: TooltipDirective;
  @ViewChild('autoComplete')
  autoComplete: NguiAutoCompleteComponent;
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
  valueField: string
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
    if (this.autoComplete) {
      if (JSON.stringify(this.autoComplete.source) === JSON.stringify(items)) {
        return;
      }
      this.autoComplete.source = items;
      if (this.showMe) {
        this._showMe = false;
        this.autoComplete.reloadList('');
        setTimeout(() => {
          this.resizeList();
          this._showMe = true;
        }, 300);
      } else {
        this.autoComplete.reloadList('');
        setTimeout(() => {
          this.resizeList();
        }, 300);
      }
    }
  }
  get items() {
    return this._items;
  }

  private _items: any[] = [];
  private _showMe = false;
  private debouncer$: Subject<string> = new Subject<string>();

  constructor(
    public translateService: TranslateService,
    public config: SelectInputConfig,
    public sanitizer: DomSanitizer
  ) {
    super();
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
    this.debouncer$.debounceTime(this.debounceTime)
      .subscribe((value: string) => this.onChangeInputValue.emit(value));
  }
  get inputReadonly() {
    return this.onChangeInputValue.observers && this.onChangeInputValue.observers.length === 0;
  }
  onKey(value: string) {
    if (!value && !this.inputReadonly) {
      this.value = null;
    }
    this.debouncer$.next(value);
  }
  get showMe() {
    return this._showMe;
  }
  set showMe(val: any) {
    setTimeout(() => {
      this.resizeList();
      this._showMe = val;
    }, 300);
  }
  get value() {
    return this.model;
  }
  set value(val: any) {
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    this.model = val;
    this.modelChange.emit(this.model);
  }
  init() {
    if (this.hardValue) {
      this.value = this.hardValue;
    }
    super.init();
  }
  resizeList() {
    if (this.value && this.value[this.valueField]) {
      this.items.map((item: any, index: number) => {
        if (item && this.value && item[this.valueField] === this.value[this.valueField]) {
          this.autoComplete.itemIndex = index;
        }
      });
    }
    if (this.autoComplete && this.autoComplete.el &&
      this.autoComplete.el.children[0] && this.autoComplete.el.children[0].children[0] &&
      this.inputElement && this.inputElement.nativeElement) {
      const options: any = this.autoComplete.el.children[0].children[0].children;
      const select: any = this.autoComplete.el.children[0];
      // if (this.items && options.length >= this.items.length) {
      for (let i = 0; i < options.length; i++) {
        if (this.width === null) {
          options[i].style.width = this.inputElement.nativeElement.offsetWidth + 'px';
        } else {
          options[i].style.width = this.width;
        }
      }
      select.style.display = '';
      // }
    } else {
      setTimeout(() => {
        this.resizeList();
      }, 200);
    }
  }
  getTitle(item: any) {
    if (item && item[this.titleField]) {
      return this.safeHtml(this.translate(item[this.titleField]));
    }
    if (item && item[this.inputTitleField]) {
      return this.safeHtml(this.translate(item[this.inputTitleField]));
    }
    return '';
  };
  focus() {
    if (this.autoComplete) {
      this.autoComplete.dropdownVisible = true;
    }
  }
  getInputTitle(item: any) {
    if (item && item[this.inputTitleField]) {
      return this.translate(item[this.inputTitleField]);
    }
    if (item && item[this.titleField]) {
      return this.translate(item[this.titleField]);
    }
    return '';
  }
}
