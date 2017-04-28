import { AppService } from '../shared/app.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ResouceEnumStatus } from '../shared/enums/resource.enums';
import { User } from '../shared/models/user.model';
import { RepositoryHelper } from './helpers/repository.helper';
import { MetaModel } from '../shared/models/meta.model';
import * as _ from 'lodash';
import { inValues, translate } from './utils';

@Injectable()
export class RepositoryService {
  public columns: any;
  public pluralName: string;
  public name: string;
  public items$: Subject<any[]>;
  public items: any[];
  public mockedItems: any[];
  public meta: MetaModel;
  public props: any = null;
  public apiUrlWithProps: string;
  public apiUrl: string;

  public parent: any;
  public cached: any;
  public ignoreCache: boolean;
  public queryProps: any;
  public statusListMessage: string;
  private _statusList: ResouceEnumStatus;
  public changeStatusList$: Subject<ResouceEnumStatus> = <Subject<ResouceEnumStatus>>new Subject();

  public statusItemMessage: string;
  private _statusItem: ResouceEnumStatus;
  public changeStatusItem$: Subject<ResouceEnumStatus> = <Subject<ResouceEnumStatus>>new Subject();

  constructor(public repositoryHelper: RepositoryHelper) {
    this.items = [];
    this.mockedItems = null;
    this.cached = [];
    this.meta = new MetaModel();
    this.meta.curPage = 1;
    this.parent = null;
  }
  newCache(): any {
    return new RepositoryService(this.repositoryHelper);
  }
  createCache(): any {
    const cache = this.newCache();
    cache.parent = this;
    this.cached.push(cache);
    return cache;
  }
  getFromCachedItems(filter: any): any[] {
    if (this.parent !== null) {
      return this.parent.getFromCachedItems(filter);
    } else {
      for (let i = 0; i < this.cached.length; i++) {
        if (_.isEqual(filter, this.cached[i].queryProps) && this.cached[i].items.length > 0) {
          return this.cached[i].items;
        }
      }
    }
    if (_.isEqual(filter, this.queryProps) && this.items.length > 0) {
      return this.items;
    }
    return null;
  }
  calcMeta(totalResults: number) {
    this.meta.totalResults = totalResults;
    this.meta.totalPages = Math.round(totalResults / this.meta.perPage);
  }
  get statusList() {
    return this._statusList;
  }
  setStatusList(status: ResouceEnumStatus, message?: string) {
    this._statusList = status;
    setTimeout((out: any) => {
      if (message) {
        this.statusListMessage = message;
      } else {
        this.statusListMessage = '';
      }
      this.changeStatusList$.next(status);
    });
  }
  get statusItem() {
    return this._statusItem;
  }
  setStatusItem(status: ResouceEnumStatus, message?: string) {
    this._statusItem = status;
    setTimeout((out: any) => {
      if (message) {
        this.statusItemMessage = message;
      } else {
        this.statusItemMessage = '';
      }
      this.changeStatusItem$.next(status);
    });
  }
  transformModel(item: any) {
    return item;
  }
  loadAllItems(loadedItems: any[]) {
    this.items = loadedItems;
    this.items$.next(this.items);
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
    if (this.mockedItems !== null) {
      return this.mockLoadAll(filter, this.mockedItems);
    }
    const result = new EventEmitter();
    if (!filter.curPage && this.meta.curPage) {
      filter.curPage = this.meta.curPage;
    }
    if (!filter.perPage && this.meta.perPage) {
      filter.perPage = this.meta.perPage;
    }
    if (this.ignoreCache) {
      filter.curPage = 1;
    }
    /* TODO: move cache to http service, current cash use for local update items cloned from root service
    if (!this.ignoreCache) {
      let cachedItems = this.getFromCachedItems(filter);
      if (cachedItems !== null) {
        return this.cacheLoadAll(cachedItems);
      }
    }
    this.ignoreCache = false;
    */
    this.queryProps = _.cloneDeep(filter);
    this.setStatusList(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    this.repositoryHelper.readItemsRequest(this)
      .map((response: any) => this.repositoryHelper.itemsResponse(this, response).map((item: any) => this.transformModel(item)))
      .subscribe((loadedItems: any[]) => {
        this.loadAllItems(loadedItems);
        if (this.items && this.items.length > 0) {
          result.emit(this.items);
          this.setStatusList(ResouceEnumStatus.Ok);
        } else {
          result.error(this.items);
          this.setStatusList(ResouceEnumStatus.NotFound,
            translate('Not found')
          );
        }
      }, (error: any) => {
        if (error.json && error.json().detail === 'Invalid page.' && filter.curPage > 1) {
          filter.curPage = 1;
          this.ignoreCache = true;
          this.loadAll(q, filter);
        } else {
          this.items$.next([]);
          result.error(this.repositoryHelper.extractError(error));
          this.setStatusList(ResouceEnumStatus.NotFound,
            translate('Not found')
          );
        }
      });
    return result;
  }
  mockLoadAll(filter: any, mockedItems: any[]) {
    const result = new EventEmitter();
    this.setStatusList(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    setTimeout((out: any) => {
      const constItems = mockedItems.filter((item: any) => inValues(item, filter.q)).
        map((item: any) => this.transformModel(item));
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
        };
      });
      this.loadAllItems(this.repositoryHelper.itemsResponse(this, items));
      if (this.items && this.items.length > 0) {
        result.emit(this.items);
        this.setStatusList(ResouceEnumStatus.Ok);
      } else {
        result.error(this.items);
        this.setStatusList(ResouceEnumStatus.NotFound,
          translate('Not found')
        );
      }
    });
    return result;
  }
  cacheLoadAll(cachedItems: any[]) {
    const result = new EventEmitter();
    this.setStatusList(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    setTimeout((out: any) => {
      this.loadAllItems(this.repositoryHelper.itemsResponse(this, cachedItems));
      if (this.items && this.items.length > 0) {
        result.emit(this.items);
        this.setStatusList(ResouceEnumStatus.Ok);
      } else {
        result.error(this.items);
        this.setStatusList(ResouceEnumStatus.NotFound,
          translate('Not found')
        );
      }
    });
    return result;
  }
  loadItem(loadedItem: any) {
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
  load(key: string | number) {
    const result = new EventEmitter();
    this.setStatusItem(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    this.repositoryHelper.readItemRequest(this, key)
      .map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response)))
      .subscribe((loadedItem: any) => {
        this.loadItem(loadedItem);
        result.emit(loadedItem);
        this.setStatusItem(ResouceEnumStatus.Ok);
      }, (error: any) => {
        result.error(this.repositoryHelper.extractError(error));
        this.setStatusItem(ResouceEnumStatus.NotFound,
          translate('Not found')
        );
      });
    return result;
  }
  createItem(createdItem: any) {
    this.calcMeta(_.toNumber(this.meta.totalResults) + 1);
    if (this.mockedItems !== null) {
      this.mockedItems.unshift(createdItem);
    }
    this.items.unshift(createdItem);
    this.items$.next(this.items);
  }
  create(item: any) {
    const result = new EventEmitter();
    if (item.validate && item.validate() !== true) {
      result.error(item.validate());
      this.setStatusItem(ResouceEnumStatus.Invalid,
        translate('Error in creating')
      );
      return result;
    }
    if (this.mockedItems !== null) {
      return this.mockCreate(item);
    }
    this.setStatusItem(ResouceEnumStatus.Creating,
      translate('Creating...')
    );
    this.repositoryHelper.createItemRequest(this, item)
      .map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response, item)))
      .subscribe((createdItem: any) => {
        this.createItem(createdItem);
        result.emit(createdItem);
        this.setStatusItem(ResouceEnumStatus.Ok);
        this.setStatusList(ResouceEnumStatus.Ok);
      }, (error: any) => {
        result.error(this.repositoryHelper.extractError(error));
        this.setStatusItem(ResouceEnumStatus.Invalid,
          translate('Error in creating')
        );
      });
    return result;
  }
  mockCreate(item: any) {
    this.setStatusItem(ResouceEnumStatus.Creating,
      translate('Creating...')
    );
    const result = new EventEmitter();
    setTimeout((out: any) => {
      if (item.length) {
        for (let i = 0; i < item.length; i++) {
          this.createItem(item[i]);
        }
      } else {
        this.createItem(item);
      }
      result.emit(item);
      this.setStatusItem(ResouceEnumStatus.Ok);
      this.setStatusList(ResouceEnumStatus.Ok);
    });
    return result;
  }
  updateItem(updatedItem: any) {
    let founded = false;
    if (this.mockedItems !== null) {
      this.mockedItems.forEach((eachItem: any, i: number) => {
        if (eachItem.pk === updatedItem.pk) {
          this.mockedItems[i] = updatedItem;
          founded = true;
        }
      });
      if (!founded) {
        this.mockedItems.unshift(updatedItem);
      }
      founded = false;
    }
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
  update(item: any) {
    const result = new EventEmitter();
    if (item.validate() !== true) {
      result.error(item.validate());
      this.setStatusItem(ResouceEnumStatus.Invalid,
        translate('Error in creating')
      );
      return result;
    }
    if (this.mockedItems !== null) {
      return this.mockUpdate(item);
    }
    this.setStatusItem(ResouceEnumStatus.Updating,
      translate('Updating...')
    );
    this.repositoryHelper.updateItemRequest(this, item)
      .map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response, item)))
      .subscribe((updatedItem: any) => {
        this.updateItem(updatedItem);
        result.emit(updatedItem);
        this.setStatusItem(ResouceEnumStatus.Ok);
        this.setStatusList(ResouceEnumStatus.Ok);
      }, (error: any) => {
        result.error(this.repositoryHelper.extractError(error));
        this.setStatusItem(ResouceEnumStatus.Invalid,
          translate('Error in updating')
        );
      });
    return result;
  }
  mockUpdate(item: any) {
    this.setStatusItem(ResouceEnumStatus.Updating,
      translate('Updating...')
    );
    const result = new EventEmitter();
    setTimeout((out: any) => {
      this.updateItem(item);
      result.emit(item);
      this.setStatusItem(ResouceEnumStatus.Ok);
      this.setStatusList(ResouceEnumStatus.Ok);
    });
    return result;
  }
  save(item: any) {
    if (item.length === undefined && item.pk) {
      return this.update(item);
    } else {
      return this.create(item);
    }
  }
  removeItems(items: any[]) {
    if (this.mockedItems !== null) {
      const keys = items.map(d => d.pk);
      this.mockedItems.forEach((t, i) => {
        if (keys.indexOf(t.pk) !== -1) { this.mockedItems.splice(i, 1); }
      });
    }
    const keys = items.map(d => d.pk);
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
  remove(items: any[]) {
    if (this.mockedItems !== null) {
      return this.mockRemove(items);
    }
    const result = new EventEmitter();
    this.setStatusItem(ResouceEnumStatus.Removing,
      translate('Removing...')
    );
    this.repositoryHelper.deleteItemsRequest(this, items)
      .subscribe((response: any) => {
        const prevLength = this.items.length;
        this.removeItems(items);
        if (prevLength === 0 && this.items.length === 0) {
          result.error({
            error: translate('Not found')
          });
          this.setStatusList(ResouceEnumStatus.NotFound,
            translate('Not found')
          );
        } else {
          if (this.items.length === 0) {
            result.emit({
              message: translate('OK')
            });
            this.setStatusList(ResouceEnumStatus.NotFound,
              translate('Not found')
            );
          } else {
            result.emit({
              message: translate('OK')
            });
            this.setStatusItem(ResouceEnumStatus.Ok);
          }
        }
      }, (error: any) => {
        result.error(this.repositoryHelper.extractError(error));
        this.setStatusItem(ResouceEnumStatus.Invalid,
          translate('Error on deleting')
        );
      });
    return result;
  }
  mockRemove(items: any[]) {
    this.setStatusItem(ResouceEnumStatus.Removing,
      translate('Removing...')
    );
    const result = new EventEmitter();
    setTimeout((out: any) => {
      const prevLength = this.items.length;
      this.removeItems(items);
      if (prevLength === 0 && this.items.length === 0) {
        result.error({
          error: translate('Not found')
        });
        this.setStatusList(ResouceEnumStatus.NotFound,
          translate('Not found')
        );
      } else {
        if (this.items.length === 0) {
          result.emit({
            message: translate('OK')
          });
          this.setStatusList(ResouceEnumStatus.NotFound,
            translate('Not found')
          );
        } else {
          result.emit({
            message: translate('OK')
          });
          this.setStatusItem(ResouceEnumStatus.Ok);
        }
      }
    });
    return result;
  }
}
