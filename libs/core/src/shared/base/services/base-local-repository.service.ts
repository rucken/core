import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { MetaModel } from '../../models/meta.model';


@Injectable()
export class BaseLocalRepositoryService {

  items$: Subject<any[]>;
  items: any[];
  meta: MetaModel;

  constructor() {
    this.items = [];
    this.meta = new MetaModel();
    this.meta.curPage = 1;
  }
  calcMeta(totalResults: number) {
    this.meta.totalResults = totalResults;
    this.meta.totalPages = Math.round(totalResults / this.meta.perPage);
  }
  loadAll() {

  }
  localLoadAll(loadedItems: any[]) {
    this.items = loadedItems;
    this.items$.next(this.items);
  }
  localLoad(loadedItem: any) {
    let notFound = true;
    this.items.forEach((item, index) => {
      if (item.pk === loadedItem.pk) {
        this.items[index] = loadedItem;
        notFound = false;
      }
    });
    if (notFound) {
      this.items.push(loadedItem);
    }
    this.items$.next(this.items);
  }
  localCreate(createdItem: any) {
    this.calcMeta(_.toNumber(this.meta.totalResults) + 1);
    this.items.unshift(createdItem);
    this.items$.next(this.items);
  }
  localUpdate(updatedItem: any) {
    let founded = false;
    this.items.forEach((eachItem: any, i: number) => {
      if (eachItem.pk === updatedItem.pk) {
        this.items[i] = updatedItem;
        founded = true;
      }
    });
    if (!founded) {
      this.calcMeta(_.toNumber(this.meta.totalResults) + 1);
      this.items.unshift(updatedItem);
    }
    this.items$.next(this.items);
  }
  localSave(item: any) {
    if (item.length === undefined && item.pk) {
      return this.localUpdate(item);
    } else {
      return this.localCreate(item);
    }
  }
  localRemove(items: any[]) {
    let keys: any[];
    keys = items.map(d => d.pk);
    this.items.forEach((t, i) => {
      if (keys.indexOf(t.pk) !== -1) { this.items.splice(i, 1); }
    });
    if (this.meta.totalResults > 1 && this.items.length === 0) {
      this.meta.curPage = this.meta.curPage - 1;
      this.loadAll();
      return;
    }
    if (this.meta.totalResults < this.meta.perPage && this.meta.curPage > 1) {
      this.meta.curPage = 1;
      this.loadAll();
      return;
    }
    this.calcMeta(_.toNumber(this.meta.totalResults) - 1);
    this.items$.next(this.items);
  }
}
