import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EndpointStatusEnum, User } from '@rucken/core';
import * as _ from 'lodash';

import { BaseComponent } from './../../base/base-component/base-component.component';
import { BaseResourcesListComponent } from './base-resources-list/base-resources-list.component';

@Component({
  selector: 'base-resources-grid',
  template: ''
})
export class BaseResourcesGridComponent extends BaseResourcesListComponent {

  @Output()
  onSelectItems: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  enabledOnEnter?: boolean;
  @Output()
  onEnter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  readonly?: boolean;
  @Input()
  hardReadonly?: boolean;

  modelMeta: any;
  selectedItems: any[];
  maxSelectCount = 1;
  modalIsOpened?: boolean;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.enabledOnEnter && !this.readonly && !this.hardReadonly) {
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

  enter() {
    this.onEnter.emit(true);
  }
  afterCreate() {
    super.afterCreate();
    if (this.enabledOnEnter === undefined) {
      this.enabledOnEnter = true;
    }
    if (this.hardReadonly === undefined) {
      this.hardReadonly = false;
    }
    this.onLoaded.subscribe((items: any[]) => {
      if (items.length) {
        this.selectItem(items[0]);
      } else {
        this.selectItem(null);
      }
    });
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
    if (this.enabledOnEnter) {
      this.focus();
    }
  }
  selectItem(item: any, event?: MouseEvent, checkFirst?: boolean) {
    if (checkFirst === undefined || (item && item.pk)) {
      this.selectedItems = [item];
    }
    this.onSelectItems.emit(this.selectedItems);
    if (this.enabledOnEnter) {
      this.focus();
    }
  }
  isSelectedItem(item: any) {
    return this.selectedItems && this.selectedItems.filter(i => i && i.pk === item.pk).length > 0;
  }
}
