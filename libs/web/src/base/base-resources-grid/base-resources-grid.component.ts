import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EndpointStatusEnum } from '@rucken/core';
import * as _ from 'lodash';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'base-resources-grid',
  template: ''
})
export class BaseResourcesGridComponent extends BaseComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<any[] | any> = new EventEmitter();
  @Input()
  onEnterEnabled?: boolean;
  @Output()
  onEnter: EventEmitter<any[] | any> = new EventEmitter();
  @Input()
  readonly?: boolean;
  @Input()
  hardReadonly?: boolean;

  modelMeta: any;
  items: any[];
  mockedItems?: any[];
  searchText = '';
  selectedItems: any[];
  cachedResourcesService: any;
  maxSelectCount = 1;
  modalIsOpened?: boolean;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.onEnterEnabled) {
      this.enter();
    }
  }

  get meta() {
    if (this.cachedResourcesService) {
      return this.cachedResourcesService.meta;
    }
    return {};
  }
  set columns(columns: any) {
    if (!_.isEmpty(columns) && this.cachedResourcesService && !_.isEqual(this.cachedResourcesService.columns, columns)) {
      this.cachedResourcesService.columns = columns;
      this.search(true);
    }
  }
  get columns(): any {
    if (this.cachedResourcesService && this.cachedResourcesService.columns === undefined) {
      this.cachedResourcesService.columns = { id: { sort: 'desc' } };
      return this.cachedResourcesService.columns;
    }
    return {};
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

  enter() {
    this.onEnter.emit(true);
  }
  pageChanged(event: any): void {
    if (this.cachedResourcesService) {
      this.cachedResourcesService.meta.curPage = event.page;
      this.cachedResourcesService.meta.perPage = event.itemsPerPage;
      this.search();
    }
  }
  init() {
    if (this.cachedResourcesService) {
      this.cachedResourcesService.items$.takeUntil(this.destroyed$).subscribe(
        (items: any[]) => {
          this.items = items;
          if (this.items) {
            this.selectItem(this.items[0], null, true);
          }
        }, (errors: any) => {
          this.items = [];
          this.selectItem(null);
        });
    }
    super.init();
    if (this.loadAll) {
      this.search();
    }
  }
  afterCreate() {
    if (this.loadAll === undefined) {
      this.loadAll = true;
    }
    if (this.onEnterEnabled === undefined) {
      this.onEnterEnabled = true;
    }
    if (this.hardReadonly === undefined) {
      this.hardReadonly = true;
    }
  }
  focus() {
    this.modalIsOpened = false;
    super.focus();
  }
  selectItem(item: any, event?: MouseEvent, checkFirst?: boolean) {
    if (event && event.toElement.classList.contains('select-col') && this.selectedItems && this.selectedItems.length > 0) {
      if (this.selectedItems.filter(eachItem => eachItem.pk === item.pk).length > 0) {
        this.selectedItems = this.selectedItems.filter(eachItem => eachItem.pk !== item.pk);
      } else {
        this.selectedItems.push(item);
      }
    } else {
      if (checkFirst === undefined || this.items.filter(
        eachItem => this.selectedItems && this.selectedItems.filter(
          selectedItem => selectedItem && selectedItem.pk === eachItem.pk).length > 0).length === 0) {
        this.selectedItems = [item];
      }
    }
    this.onSelectItems.emit(this.selectedItems);
    if (this.onEnterEnabled) {
      this.focus();
    }
  }
  isSelectedItem(item: any) {
    return this.selectedItems && this.selectedItems.filter(i => i && i.pk === item.pk).length > 0;
  }
  search(ignoreCache?: boolean) {
    const filter: any = {};
    if (this.cachedResourcesService) {
      this.cachedResourcesService.ignoreCache = ignoreCache;
      if (this.mockedItems) {
        this.cachedResourcesService.mockedItems = this.mockedItems;
      }
      this.cachedResourcesService.loadAll(this.searchText, filter);
    }
  }
}
