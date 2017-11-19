import { map } from 'rxjs/operators';

import { EventEmitter, Injectable } from '@angular/core';

import { inValues, translate } from '../../common/utils';
import { BaseRemoteRepositoryService } from './base-remote-repository.service';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';


@Injectable()
export class BaseRepositoryService extends BaseRemoteRepositoryService {

  mockedItems$: Subject<any[]> = new Subject<any[]>();
  protected _mockedItems: any[] | any = null;

  get mockedItems() {
    return this._mockedItems.map((mapItem: any) => {
      if (mapItem && mapItem.pkIsNumber && mapItem.pk < 0) {
        mapItem.pk = null;
      }
      return mapItem;
    });
  }
  set mockedItems(_mockedItems: any[]) {
    if (_mockedItems) {
      this._mockedItems = _mockedItems.map((mapItem: any) => {
        if (mapItem && mapItem.pkIsNumber && (mapItem.pk === null || mapItem.pk === undefined)) {
          mapItem.pk = this.getMockItemsNextPk(mapItem);
        }
        return mapItem;
      });
    } else {
      this._mockedItems = _mockedItems;
    }
    this.mockedItems$.next(this._mockedItems);
  }
  getMockItemsNextPk(item: any) {
    if (item && item.pkIsNumber) {
      let currentMax = 0;
      this._mockedItems.map((mapItem: any) => Math.abs(mapItem.pk) > currentMax ? currentMax = Math.abs(mapItem.pk) : null);
      return (currentMax + 1) * -1;
    }
    return null;
  }
  loadAll(q?: string, filter?: any): EventEmitter<any> {
    if (q === undefined) {
      q = '';
    }
    if (filter === undefined) {
      filter = this.queryProps;
    }
    if (filter === undefined) {
      filter = {};
    }
    if (!filter.q) {
      filter.q = !q ? '' : q;
    }
    if (this._mockedItems !== null) {
      return this.mockLoadAll(filter, this._mockedItems);
    }
    return this.remoteLoadAll(filter);
  }
  create(item: any): EventEmitter<any> {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    if (this._mockedItems !== null) {
      return this.mockCreate(item);
    }
    return this.remoteCreate(item);
  }
  update(item: any): EventEmitter<any> {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    if (this._mockedItems !== null) {
      return this.mockUpdate(item);
    }
    return this.remoteUpdate(item);
  }
  remove(items: any[]): EventEmitter<any> {
    if (this._mockedItems !== null) {
      return this.mockRemove(items);
    }
    return this.remoteRemove(items);
  }
  mockLoadAll(filter: any, mockedItems: any[]): EventEmitter<any> {
    const result = this.beforeLoadAll(filter);
    setTimeout((out: any) => {
      const constItems = this.transformModels(mockedItems.filter((item: any) => inValues(item, filter.q)));
      this.calcMeta(constItems.length);
      let count = 0;
      if (this.meta.perPage === undefined) {
        console.error(
          translate('Error, you not set perPage count')
        );
      }
      const startIndex = ((this.meta.curPage <= 1 ? 0 : this.meta.curPage - 1) * this.meta.perPage) + 1;
      const items = constItems.filter((item: any, index: number) => {
        if (index + 1 >= startIndex && count < this.meta.perPage) {
          count++;
          return true;
        } else {
          return false;
        }
      });
      this.localLoadAll(this.repositoryHelper.itemsResponse(this, items));
      this.afterLoadAll(result, filter, null, null);
    });
    return result;
  }
  mockCreate(item: any): EventEmitter<any> {
    const result = this.beforeCreate(item);
    setTimeout((out: any) => {
      let items = _.isArray(item) ? item : [item];
      items = items.map((currentItem: any) => {
        currentItem.pk = this.getMockItemsNextPk(currentItem);
        this._mockedItems.unshift(currentItem);
        return currentItem;
      });
      this.afterCreate(result, items, null, null);
    });
    return result;
  }
  mockUpdate(item: any): EventEmitter<any> {
    const result = this.beforeUpdate(item);
    setTimeout((out: any) => {
      let items = _.isArray(item) ? item : [item];
      items = items.map((currentItem: any) => {
        let founded = false;
        this._mockedItems.forEach((eachItem: any, i: number) => {
          if (eachItem.pk === currentItem.pk) {
            this._mockedItems[i] = currentItem;
            founded = true;
          }
        });
        if (!founded) {
          this._mockedItems.unshift(currentItem);
        }
      });
      this.afterUpdate(result, item, null, null);
    });
    return result;
  }
  mockRemove(items: any[]): EventEmitter<any> {
    const result = this.beforeRemove(items);
    setTimeout((out: any) => {
      const keys = items.map(d => d.pk);
      this._mockedItems.forEach((t: any, i: number) => {
        if (keys.indexOf(t.pk) !== -1) { this._mockedItems.splice(i, 1); }
      });
      this.afterRemove(result, items, null, null);
    });
    return result;
  }
}
