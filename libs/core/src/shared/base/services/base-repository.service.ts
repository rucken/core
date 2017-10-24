import 'rxjs/add/operator/map';

import { EventEmitter, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { translate, inValues } from '../../utils/utils';
import { EndpointStatusEnum } from './../../enums/endpoint-status.enum';
import { MetaModel } from './../../models/meta.model';
import { RepositoryHelper } from '../../helpers/repository.helper';
import { BaseRemoteRepositoryService } from './base-remote-repository.service';


@Injectable()
export class BaseRepositoryService extends BaseRemoteRepositoryService {

  protected _mockedItems: any[];

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this._mockedItems = null;
  }
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
  }
  getMockItemsNextPk(item: any) {
    if (item && item.pkIsNumber) {
      let currentMax = 0;
      this._mockedItems.map((mapItem: any) => Math.abs(mapItem.pk) > currentMax ? currentMax = Math.abs(mapItem.pk) : null);
      return (currentMax + 1) * -1;
    }
    return null;
  }
  loadAll(q?: string, filter?: any) {
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
    } else {
      return this.remoteLoadAll(filter);
    }
  }
  create(item: any) {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    if (this._mockedItems !== null) {
      return this.mockUpdate(item);
    }
    return this.remoteCreate(item);
  }
  update(item: any) {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    if (this._mockedItems !== null) {
      return this.mockUpdate(item);
    }
    return this.remoteUpdate(item);
  }
  remove(items: any[]) {
    if (this._mockedItems !== null) {
      return this.mockRemove(items);
    }
    return this.remoteRemove(items);
  }
  mockLoadAll(filter: any, mockedItems: any[]) {
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
  mockCreate(item: any) {
    const result = this.beforeCreate(item);
    setTimeout((out: any) => {
      item.pk = this.getMockItemsNextPk(item);
      this._mockedItems.unshift(item);
      this.afterCreate(result, item, null, null);
    });
    return result;
  }
  mockUpdate(item: any) {
    const result = this.beforeUpdate(item);
    setTimeout((out: any) => {
      let founded = false;
      this._mockedItems.forEach((eachItem: any, i: number) => {
        if (eachItem.pk === item.pk) {
          this._mockedItems[i] = item;
          founded = true;
        }
      });
      if (!founded) {
        this._mockedItems.unshift(item);
      }
      this.afterUpdate(result, item, null, null);
    });
    return result;
  }
  mockRemove(items: any[]) {
    const result = this.beforeRemove(items);
    setTimeout((out: any) => {
      const keys = items.map(d => d.pk);
      this._mockedItems.forEach((t, i) => {
        if (keys.indexOf(t.pk) !== -1) { this._mockedItems.splice(i, 1); }
      });
      this.afterRemove(result, items, null, null);
    });
    return result;
  }
}
