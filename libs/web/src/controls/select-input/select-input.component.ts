import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Injector } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { TypeaheadDirective } from 'ngx-bootstrap/typeahead';
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
  @ViewChild('typeahead')
  typeahead: TypeaheadDirective;
  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  debounceTime: number;
  @Output()
  onChangeInputValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onInputFocus: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  labelClass = 'control-label';
  @Input()
  inputClass = 'form-control';
  @Input()
  inputFrameClass = '';
  @Input()
  inFormGroup = true;
  @Input()
  readonly = false;
  @Input()
  inputReadonly = false;
  @Input()
  name = 'select';
  @Input()
  placeholder = '';
  @Input()
  valueField: string;
  @Input()
  title: string;
  @Input()
  set model(model: any) {
    this._model = model;
    if (!model) {
      this.value = null;
      this.textValue = '';
    }
  }
  get model(): any {
    return this._model;
  }
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
  dataSource: Subject<any[]>;
  @Input()
  set items(items: any) {
    this._items = items;
  }
  get items(): any {
    if (this.dataSource) {
      return this.dataSource;
    }
    return this._items.map((item: any) => {
      try {
        item[this.inputTitleField] = this.getInputTitle(item);
      } catch (error) {

      }
      return item;
    });
  }
  @Input()
  set textValue(textValue: string) {
    this._textValue = textValue;
    if (this._textValue === '') {
      this.value = null;
    }
    this.debouncer$.next(this.textValue);
    this.changeDetectorRef.detectChanges();
  }
  get textValue() {
    return this._textValue;
  }

  config: SelectInputConfig;
  debouncer$: Subject<string>;

  private _model: any;
  private _textValue: string;
  private _items: any[] = [];

  constructor(
    public injector: Injector,
    public changeDetectorRef: ChangeDetectorRef
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
  inputFocus(value: string) {
    this.onInputFocus.emit(value);
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
      this.textValue = this.getInputTitle(val);
      this.model = val;
    } else {
      // this.textValue = '';
      this.model = null;
    }
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
    super.init();
    if (!this.textValue) {
      this.value = this.value;
    }
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
  loading(status: boolean) {
    if (!status) {
      this.resizeList();
    }
  }
  resizeList() {
    setTimeout(() => {
      if (this.changeDetectorRef) {
        this.changeDetectorRef.detectChanges();
        if (this.typeahead && this.typeahead._container) {
          if (this.typeahead._container.element.nativeElement.children[0]) {
            const list: any = this.typeahead._container.element.nativeElement.children[0];
            if (this.width === null) {
              list.style.width = this.inputElement.nativeElement.offsetWidth + 'px';
            } else {
              list.style.width = this.width;
            }
          }
        }
      }
    }, 1);
  }
}
