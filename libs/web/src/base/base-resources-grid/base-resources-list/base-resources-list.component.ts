import { takeUntil } from 'rxjs/operators';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EndpointStatusEnum, User } from '@rucken/core';

import { BaseComponent } from '../../base-component/base-component.component';


@Component({
  selector: 'base-resources-list',
  template: ''
})
export class BaseResourcesListComponent extends BaseComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onLoaded: EventEmitter<any[]> = new EventEmitter<any[]>();

  items: any[];
  mockedItems?: any[];
  searchText = '';
  cachedResourcesService: any;

  accessToRead = false;
  accessToAdd = false;
  accessToChange = false;
  accessToDelete = false;
  accessToManage = false;

  get meta() {
    if (this.cachedResourcesService) {
      return this.cachedResourcesService.meta;
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
    this.initSearch();
  }
  initSearch() {
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
    if (this.cachedResourcesService) {
      this.cachedResourcesService.items$.pipe(takeUntil(this.destroyed$)).subscribe(
        (items: any[]) => {
          this.items = items;
          if (this.items) {
            this.onLoaded.emit(this.items);
          }
        }, (errors: any) => {
          this.items = [];
          this.onLoaded.emit(this.items);
        });
      this.items = this.cachedResourcesService.items;
      this.onLoaded.emit(this.items);
    }
    if (this.accountService) {
      this.accountService.account$.pipe(takeUntil(this.destroyed$)).subscribe((account: any | User) => this.initAccesses());
    }
  }
  search(ignoreCache?: boolean) {
    const filter: any = {};
    if (this.cachedResourcesService) {
      if (ignoreCache !== undefined) {
        this.cachedResourcesService.ignoreCache = ignoreCache;
      }
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
