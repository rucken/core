import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EndpointStatusEnum } from '@rucken/core';

import { BaseComponent } from './../../../base/base-component/base-component.component';


@Component({
  selector: 'base-resource-input',
  template: ''
})
export class BaseResourceInputComponent extends BaseComponent {

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
  name = 'base-resource';
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
  loadAll?: boolean;

  items: any[];
  cachedResourcesService: any;

  get value() {
    return this.model;
  }
  set value(val) {
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
    if (this.cachedResourcesService.statusList === EndpointStatusEnum.Ok) {
      return '';
    } else {
      return this.cachedResourcesService.statusListMessage;
    }
  }

  constructor(
    public translateService: TranslateService
  ) {
    super();
  }
  afterCreate() {
    super.afterCreate();
    this.translateService.onLangChange.takeUntil(this.destroyed$).subscribe(() =>
      this.initSearch()
    );
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    if (this.loadAll === undefined) {
      this.loadAll = false;
    }
    if (this.readonly === undefined) {
      this.readonly = false;
    }
    if (this.hardReadonly === undefined) {
      this.hardReadonly = false;
    }
    if (this.inputReadonly === undefined) {
      this.inputReadonly = false;
    }
  }
  init() {
    super.init();
    this.initSearch();
  }
  initSearch() {
    if (this.select && this.loadAll) {
      this.search();
    }
  }
  search() {
    const filter: any = {};
    this.cachedResourcesService.loadAll('', filter);
  }
}
