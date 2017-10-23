import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EndpointStatusEnum } from '@rucken/core';

import { BaseComponent } from './../../../base/base-component/base-component.component';
import { BaseResourceSelectInputConfig } from './base-resource-select-input.config';

@Component({
  selector: 'base-resource-select-input',
  template: ''
})
export class BaseResourceSelectInputComponent extends BaseComponent {

  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'form-control';
  @Input()
  inputFrameClass?= '';
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?= 'fa fa-search';
  @Input()
  readonly?: boolean;
  @Input()
  hardReadonly?: boolean;
  @Input()
  inputReadonly?: boolean;
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
  select?: boolean;
  @Input()
  width: string = null;
  @Input()
  loadAll?: boolean;

  items: any[];
  cachedResourcesService: any;

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
    if (!this.cachedResourcesService) {
      return '';
    }
    if (this.cachedResourcesService.statusList === EndpointStatusEnum.Ok) {
      return '';
    } else {
      return this.cachedResourcesService.statusListMessage;
    }
  }

  constructor(
    public translateService: TranslateService,
    public config: BaseResourceSelectInputConfig
  ) {
    super();
  }
  afterCreate() {
    if (this.select === undefined) {
      this.select = this.config.select;
    }
    if (this.lookupIcon === undefined) {
      this.lookupIcon = this.config.lookupIcon;
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = this.config.errorInTooltip;
    }
    if (this.readonly === undefined) {
      this.readonly = false;
    }
    if (this.hardReadonly === undefined) {
      this.hardReadonly = false;
    }
    if (this.inputReadonly === undefined) {
      this.inputReadonly = true;
    }
    if (this.loadAll === undefined) {
      this.loadAll = false;
    }
    if (this.inputElement) {
      this.inputElement.hardValue = this.hardValue;
    }
    this.translateService.onLangChange.takeUntil(this.destroyed$).subscribe(() => this.init());
    if (!this.cachedResourcesService) {
      this.cachedResourcesService.items$.takeUntil(this.destroyed$).subscribe(
        (pageTypes: any[]) => {
          this.items = pageTypes;
          if (this.inputElement) {
            this.inputElement.items = this.items;
            this.inputElement.init();
          }
        }, (errors: any) => {
          this.items = [];
        });
    }
  }
  init() {
    super.init();
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    if (this.select && this.loadAll) {
      this.search();
    }
  }
  search() {
    const filter: any = {};
    if (!this.cachedResourcesService) {
      this.cachedResourcesService.loadAll('', filter);
    }
  }
}
