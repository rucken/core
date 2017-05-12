import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { HostListener, Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../shared/app.service';
import { AccountService } from '../../shared/account.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';

export class ResourcesGridComponent implements OnInit {
  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<any[] | any>;
  @Input()
  onEnterEnabled?= false;
  @Output()
  onEnter: EventEmitter<any[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Input()
  public readonly: boolean;
  @Input()
  public hardReadonly = false;

  public modelMeta: any;
  public items: any[];
  public searchText = '';
  public selectedItems: any[];
  public cachedResourcesService: any;
  public maxSelectCount = 1;

  public modalIsOpened: boolean;

  public get meta() {
    return this.cachedResourcesService.meta;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.onEnterEnabled) {
      this.enter();
    }
  }
  constructor() {
    this.onSelectItems = new EventEmitter();
    this.onEnter = new EventEmitter();
  }
  enter() {
    this.onEnter.emit(true);
  }
  set columns(columns) {
    if (JSON.stringify(this.cachedResourcesService.columns) !== JSON.stringify(columns)) {
      this.cachedResourcesService.columns = columns;
      this.search(true);
    }
  }
  get columns(): any {
    if (this.cachedResourcesService.columns === undefined) {
      this.cachedResourcesService.columns = { id: { sort: 'desc' } };
    }
    return this.cachedResourcesService.columns;
  }
  set mockedItems(items) {
    this.cachedResourcesService.mockedItems = items;
  }
  get mockedItems() {
    return this.cachedResourcesService.mockedItems;
  }
  pageChanged(event: any): void {
    this.cachedResourcesService.meta.curPage = event.page;
    this.cachedResourcesService.meta.perPage = event.itemsPerPage;
    this.search();
  }
  get statusListMessage() {
    if (this.cachedResourcesService.statusList === ResouceEnumStatus.Ok) {
      return '';
    } else {
      return this.cachedResourcesService.statusListMessage;
    }
  }
  ngOnInit() {
    this.cachedResourcesService.items$.subscribe(
      (resources: any[]) => {
        this.items = resources;
        if (this.items) {
          this.selectItem(this.items[0], null, true);
        }
      }, (errors: any) => {
        this.items = [];
        this.selectItem(null);
      });
    this.init();
  }
  init() {
    this.loadAll = this.loadAll === undefined ? true : this.loadAll;

    if (this.loadAll) {
      this.search();
    }
  }
  focus() {
    this.modalIsOpened = false;
    if (this.focusElement && this.focusElement.nativeElement) {
      this.focusElement.nativeElement.focus();
    }
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
    this.cachedResourcesService.ignoreCache = ignoreCache;
    this.cachedResourcesService.loadAll(this.searchText, filter);
  }
}
