import { EventEmitter, Input, Output, isDevMode } from '@angular/core';
import { translate } from '@rucken/core';
import { ValidatorOptions } from 'class-validator';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { IFactoryModel, IModel } from 'ngx-repository';
import { BehaviorSubject } from 'rxjs';

export class BasePromptFormModalComponent<TModel extends IModel> {
  @Input()
  set processing(value: boolean) {
    this.processing$.next(value);
  }
  get processing() {
    return this.processing$.getValue();
  }
  processing$ = new BehaviorSubject(false);
  @Input()
  checkIsDirty?: boolean;
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
  @Input()
  validateForm = true;

  @Input()
  hideOnNo = true;
  @Input()
  hideOnYes = false;

  get data() {
    return this.form && this.form.object;
  }
  set data(data: any) {
    if (this.form) {
      this.form.object = data;
    }
  }

  form: DynamicFormGroup<TModel>;
  strings: any;
  formBuilder = new DynamicFormBuilder();
  yesData: any;
  noData: any;

  constructor(
    protected bsModalRef?: BsModalRef,
    private _factoryModel?: IFactoryModel<TModel>,
    private _controlsConfig?: {
      [key: string]: any;
    },
    private _extra?: {
      [key: string]: any;
      customValidatorOptions?: ValidatorOptions;
    }
  ) {
    this.group(_factoryModel, _controlsConfig, _extra);
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
      this._controlsConfig = controlsConfig;
    }
    if (extra) {
      this._extra = extra;
    }
    if (factoryModel) {
      this._factoryModel = factoryModel;
    }
    if (this._factoryModel) {
      const newObject = new this._factoryModel();
      if (this._factoryModel.strings) {
        this.strings = this._factoryModel.strings;
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
      this.form = this.formBuilder.group(
        this._factoryModel,
        controlsConfig,
        extra
      );
    }
  }
  onYesClick(data?: any): void {
    this.yesData = data;
    if (!this.message && this.validateForm) {
      this.form.externalErrors = undefined;
      if (this.form.valid) {
        this.yes.emit(this);
      } else {
        this.form.validateAllFormFields();
      }
    } else {
      this.yes.emit(this);
    }
    if (this.hideOnYes && this.bsModalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  onNoClick(data?: any): void {
    this.noData = data;
    this.no.emit(this);
    if (this.hideOnNo && this.bsModalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  hide() {
    this.bsModalRef.hide();
  }
}
