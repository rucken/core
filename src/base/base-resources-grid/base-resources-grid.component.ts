import { EndpointStatusEnum } from './../../shared/enums/endpoint-status.enum';
import { MetaModel } from './../../shared/models/meta.model';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { Input, Output, EventEmitter, HostListener, Component } from '@angular/core';

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
  onEnterEnabled?= false;
  @Output()
  onEnter: EventEmitter<any[] | any> = new EventEmitter();
  @Input()
  readonly: boolean;
  @Input()
  hardReadonly = false;

  modelMeta: any;
  items: any[];
  searchText = '';
  selectedItems: any[];
  cachedResourceService: any;
  maxSelectCount = 1;
  modalIsOpened: boolean;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.onEnterEnabled) {
      this.enter();
    }
  }

  get meta() {
    if (this.cachedResourceService) {
      return this.cachedResourceService.meta;
    }
    return {};
  }
  set columns(columns) {
    if (this.cachedResourceService && JSON.stringify(this.cachedResourceService.columns) !== JSON.stringify(columns)) {
      this.cachedResourceService.columns = columns;
      this.search(true);
    }
  }
  get columns(): any {
    if (this.cachedResourceService && this.cachedResourceService.columns === undefined) {
      this.cachedResourceService.columns = { id: { sort: 'desc' } };
      return this.cachedResourceService.columns;
    }
    return {};
  }
  set mockedItems(items) {
    if (this.cachedResourceService) {
      this.cachedResourceService.mockedItems = items;
    }
  }
  get mockedItems() {
    if (this.cachedResourceService) {
      return this.cachedResourceService.mockedItems;
    }
    return [];
  }
  get statusListMessage() {
    if (!this.cachedResourceService) {
      return '';
    }
    if (this.cachedResourceService.statusList === EndpointStatusEnum.Ok) {
      return '';
    } else {
      return this.cachedResourceService.statusListMessage;
    }
  }

  enter() {
    this.onEnter.emit(true);
  }
  pageChanged(event: any): void {
    if (this.cachedResourceService) {
      this.cachedResourceService.meta.curPage = event.page;
      this.cachedResourceService.meta.perPage = event.itemsPerPage;
      this.search();
    }
  }
  init() {
    if (this.cachedResourceService) {
      this.cachedResourceService.items$.subscribe(
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
    this.loadAll = this.loadAll === undefined ? true : this.loadAll;

    if (this.loadAll) {
      this.search();
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
    if (this.cachedResourceService) {
      this.cachedResourceService.ignoreCache = ignoreCache;
      this.cachedResourceService.loadAll(this.searchText, filter);
    }
  }
}
