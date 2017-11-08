import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EndpointStatusEnum, User } from '@rucken/core';
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

  accessToRead = false;
  accessToAdd = false;
  accessToChange = false;
  accessToDelete = false;
  accessToManage = false;

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
    return this.cachedResourcesService.columns;
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
    super.init();
    this.initAccesses(this.cachedResourcesService ? this.cachedResourcesService.name : null);
    if (this.loadAll) {
      this.search();
    }
  }
  initAccesses(contentType?: string) {
    contentType = contentType ? contentType : this.cachedResourcesService.name;
    this.accessToManage = this.checkPermissions(['manage_' + contentType]);
    this.accessToRead = this.accessToManage ? this.accessToManage : this.checkPermissions(['read_' + contentType]);
    this.accessToAdd = this.accessToManage ? this.accessToManage : this.checkPermissions(['add_' + contentType]);
    this.accessToChange = this.accessToManage ? this.accessToManage : this.checkPermissions(['change_' + contentType]);
    this.accessToDelete = this.accessToManage ? this.accessToManage : this.checkPermissions(['delete_' + contentType]);
  }
  afterCreate() {
    super.afterCreate();
    if (this.loadAll === undefined) {
      this.loadAll = true;
    }
    if (this.onEnterEnabled === undefined) {
      this.onEnterEnabled = true;
    }
    if (this.hardReadonly === undefined) {
      this.hardReadonly = false;
    }
    if (this.cachedResourcesService) {
      this.cachedResourcesService.items$.takeUntil(this.destroyed$).subscribe(
        (items: any[]) => {
          this.items = items;
          if (this.items) {
            this.selectItem(this.items[0], undefined, true);
          }
        }, (errors: any) => {
          this.items = [];
          this.selectItem(null);
        });
      this.items = this.cachedResourcesService.items;
    }
    if (this.accountService) {
      this.accountService.account$.takeUntil(this.destroyed$).subscribe((account: any | User) => this.initAccesses());
    }
  }
  focus() {
    this.modalIsOpened = false;
    super.focus();
  }
  multiSelectItem(item: any, event?: MouseEvent, checkFirst?: boolean) {
    if (this.selectedItems.filter(eachItem => eachItem.pk === item.pk).length > 0) {
      this.selectedItems = this.selectedItems.filter(eachItem => eachItem.pk !== item.pk);
    } else {
      this.selectedItems.push(item);
    }
    this.onSelectItems.emit(this.selectedItems);
    if (this.onEnterEnabled) {
      this.focus();
    }
  }
  selectItem(item: any, event?: MouseEvent, checkFirst?: boolean) {
    if (checkFirst === undefined || (item && item.pk)) {
      this.selectedItems = [item];
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
      this.searchWithMockedItems(filter);
    }
  }
  searchWithMockedItems(filter: any) {
    if (this.mockedItems) {
      this.cachedResourcesService.mockedItems = this.mockedItems;
    }
    this.cachedResourcesService.loadAll(this.searchText, filter);
  }
}
