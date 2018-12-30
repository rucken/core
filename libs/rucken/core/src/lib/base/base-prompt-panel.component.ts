import { EventEmitter, Input, isDevMode, OnChanges, Output } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { BindObservable } from 'bind-observable';
import { ValidatorOptions } from 'class-validator';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { IFactoryModel, IModel } from 'ngx-repository';
import { Observable } from 'rxjs';
import { translate } from '../utils/translate';
import { IBaseForm } from './base-form.interface';

export class BasePromptPanelComponent<TModel extends IModel> implements ControlValueAccessor, OnChanges, IBaseForm {
  @BindObservable()
  @Input()
  processing = false;
  processing$: Observable<boolean>;
  @Input()
  checkIsDirty?: boolean;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  infoMessage: string;
  @Input()
  errorMessage: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();

  @BindObservable()
  @Input()
  yesClass: string;
  yesClass$: Observable<string>;
  @BindObservable()
  @Input()
  noClass: string;
  noClass$: Observable<string>;

  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;
  @Input()
  disabled: boolean;
  @Input()
  validateForm = true;

  get data() {
    return this.form.object;
  }
  set data(data: TModel) {
    this.form.object = data;
  }

  form: DynamicFormGroup<TModel>;
  strings: any;
  formBuilder = new DynamicFormBuilder();
  yesData: any;
  noData: any;

  propagateChange: any = () => {};
  validateFn: any = () => {};

  constructor(
    public factoryModel?: IFactoryModel<TModel>,
    public controlsConfig?: {
      [key: string]: any;
    },
    public extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    this.group(factoryModel, controlsConfig, extra);
  }
  group(
    factoryModel?: IFactoryModel<TModel>,
    controlsConfig?: {
      [key: string]: any;
    },
    extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    if (controlsConfig) {
      this.controlsConfig = controlsConfig;
    }
    if (extra) {
      this.extra = extra;
    }
    if (factoryModel) {
      this.factoryModel = factoryModel;
    }
    if (this.factoryModel) {
      const newObject = new this.factoryModel();
      if (this.factoryModel.strings) {
        this.strings = this.factoryModel.strings;
      } else {
        this.strings = Object.keys(newObject).reduce((acc, cur, i) => {
          acc[cur] = cur;
          return acc;
        }, {});
      }
      if (!controlsConfig) {
        controlsConfig = {};
        const keys = Object.keys(newObject);
        keys.map(key => (controlsConfig[key] = ''));
      }
      this.form = this.formBuilder.group(this.factoryModel, controlsConfig, extra);
    }
  }
  onNoClick(data?: any): void {
    this.noData = data;
    if (isDevMode() && this.no.observers.length === 0) {
      console.warn('No subscribers found for "no"', this);
    }
    this.no.emit(this);
  }
  onYesClick(data?: any) {
    this.onYesClickAsync(data).then();
  }
  async onYesClickAsync(data?: any) {
    this.yesData = data;
    try {
      await this.form.clearExternalErrorsAsync();
    } catch (error) {
      throw error;
    }
    if (this.validateForm) {
      if (this.form.valid) {
        if (isDevMode() && this.yes.observers.length === 0) {
          console.warn('No subscribers found for "yes"', this);
        }
        this.propagateChange(this.data);
        this.yes.emit(this);
      } else {
        this.form.validateAllFormFields();
      }
    } else {
      this.propagateChange(this.data);
      this.yes.emit(this);
    }
  }
  validate(c: FormControl) {
    return this.validateFn(c);
  }
  ngOnChanges(inputs) {
    this.propagateChange(this.data);
  }
  writeValue(value) {
    this.data = value;
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
}
