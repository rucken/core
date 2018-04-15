import { EventEmitter, Input, OnChanges, Output, isDevMode } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { translate } from '@rucken/core';
import { ValidatorOptions } from 'class-validator';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { IFactoryModel, IModel } from 'ngx-repository';

export class BasePromptPanelComponent<TModel extends IModel> implements ControlValueAccessor, OnChanges {

  @Input()
  processing: boolean;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();
  @Input()
  yesClass = 'btn btn-primary';
  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;

  get data() {
    return this.form.object;
  }
  set data(data: TModel) {
    this.form.object = data;
  }

  form: DynamicFormGroup<TModel>;
  strings: any;
  formBuilder = new DynamicFormBuilder();
  propagateChange: any = () => { };
  validateFn: any = () => { };

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
    this.group(
      factoryModel,
      controlsConfig,
      extra
    );
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
        keys.map(key => controlsConfig[key] = '');
      }
      this.form = this.formBuilder.group(this.factoryModel, controlsConfig, extra);
    }
  }
  onNoClick(): void {
    if (isDevMode() && this.no.observers.length === 0) {
      console.warn('No subscribers found for "no"', this);
    }
    this.no.emit(this);
  }
  onYesClick(): void {
    this.form.externalErrors = undefined;
    if (this.form.valid) {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
      this.propagateChange(this.data);
      this.yes.emit(this);
    } else {
      this.form.validateAllFormFields();
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
  registerOnTouched() {
  }
}
