import { map } from 'rxjs/operators';

import { EventEmitter, Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { translate } from '../../common/utils';
import { RepositoryHelper } from '../../helpers/repository.helper';
import { EndpointStatusEnum } from './../../enums/endpoint-status.enum';
import { BaseLocalRepositoryService } from './base-local-repository.service';


@Injectable()
export class BaseRemoteRepositoryService extends BaseLocalRepositoryService {

  columns: any;
  pluralName: string;
  name: string;
  props: any = null;
  apiUrlWithProps: string;
  apiUrl: string;
  ignoreCache: boolean;
  queryProps: any;
  statusListMessage: string;
  statusItemMessage: string;
  changeStatusList$: Subject<EndpointStatusEnum> = new Subject<EndpointStatusEnum>();
  changeStatusItem$: Subject<EndpointStatusEnum> = new Subject<EndpointStatusEnum>();

  get statusList() {
    return this._statusList;
  }
  get statusItem() {
    return this._statusItem;
  }

  protected _statusList: EndpointStatusEnum;
  protected _statusItem: EndpointStatusEnum;

  repositoryHelper: RepositoryHelper;
  parent: any = null;
  cached: any = [];

  constructor(
    public injector: Injector
  ) {
    super();
    this.repositoryHelper = injector.get(RepositoryHelper);
  }
  newCache(): any {
    return new BaseRemoteRepositoryService(this.injector);
  }
  createCache(): any {
    const cache = this.newCache();
    cache.parent = this;
    this.cached.push(cache);
    return cache;
  }
  setStatusList(status: EndpointStatusEnum, message?: string) {
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
  setStatusItem(status: EndpointStatusEnum, message?: string) {
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
  transformModels(items: any[]) {
    return items.map((item: any) => this.transformModel(item));
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
    return this.remoteLoadAll(filter);
  }
  remoteLoadAll(filter: any) {
    if (!filter.curPage && this.meta.curPage) {
      filter.curPage = this.meta.curPage;
    }
    if (!filter.perPage && this.meta.perPage) {
      filter.perPage = this.meta.perPage;
    }
    if (this.ignoreCache) {
      filter.curPage = 1;
    }
    this.queryProps = _.cloneDeep(filter);
    const result = this.beforeLoadAll(filter);
    setTimeout(() => {
      this.repositoryHelper.readItemsRequest(this)
        .pipe(map((response: any) => this.transformModels(this.repositoryHelper.itemsResponse(this, response))))
        .subscribe((loadedItems: any[]) => {
          this.localLoadAll(loadedItems);
          this.afterLoadAll(result, filter, null, null);
        }, (error: any) => {
          this.afterLoadAll(result, filter, null, error);
        });
    }, 1);
    return result;
  }
  beforeLoadAll(filter: any): EventEmitter<any> {
    this.setStatusList(EndpointStatusEnum.Loading,
      translate('Loading...')
    );
    return new EventEmitter<any>();
  }
  afterLoadAll(result: EventEmitter<any>, filter: any, response: any, error: any) {
    if (!error) {
      if (this.items && this.items.length > 0) {
        result.emit(this.items);
        this.setStatusList(EndpointStatusEnum.Ok);
      } else {
        result.error(this.items);
        this.setStatusList(EndpointStatusEnum.NotFound,
          translate('Not found')
        );
      }
    } else {
      const errorBody = this.repositoryHelper.extractError(error);
      if (errorBody && errorBody.message && errorBody.message[0] === 'Invalid page.' && filter.curPage > 1) {
        filter.curPage = 1;
        this.ignoreCache = true;
        this.loadAll(filter.q, filter);
      } else {
        this.items$.next([]);
        result.error(errorBody);
        this.setStatusList(EndpointStatusEnum.NotFound,
          errorBody.message && errorBody.message[0] ? translate(errorBody.message[0]) : translate('Not found')
        );
      }
    }
  }
  load(item: any) {
    return this.loadRemote(item);
  }
  loadRemote(key: string | number) {
    const result = this.beforeLoad(key);
    this.repositoryHelper.readItemRequest(this, key)
      .pipe(map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response))))
      .subscribe((loadedItem: any) => {
        this.afterLoad(result, loadedItem, null, null);
      }, (error: any) => {
        this.afterLoad(result, null, null, error);
      });
    return result;
  }
  beforeLoad(key: string | number): EventEmitter<any> {
    this.setStatusItem(EndpointStatusEnum.Loading,
      translate('Loading...')
    );
    return new EventEmitter<any>();
  }
  afterLoad(result: EventEmitter<any>, item: any, response: any, error: any) {
    if (!error) {
      this.localLoad(item);
      result.emit(item);
      this.setStatusItem(EndpointStatusEnum.Ok);
    } else {
      const errorBody = this.repositoryHelper.extractError(error);
      result.error(errorBody);
      this.setStatusItem(EndpointStatusEnum.NotFound,
        errorBody.message && errorBody.message[0] ? translate(errorBody.message[0]) : translate('Not found')
      );
    }
  }
  create(item: any) {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    return this.remoteCreate(item);
  }
  validateError(item: any): EventEmitter<any> {
    const result = new EventEmitter<any>();
    result.error(item.validate());
    this.setStatusItem(EndpointStatusEnum.Invalid,
      translate('Error in creating')
    );
    return result;
  }
  remoteCreate(item: any) {
    const result = this.beforeCreate(item);
    setTimeout(() => {
      this.repositoryHelper.createItemRequest(this, item)
        .pipe(map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response, item))))
        .subscribe((createdItem: any) => {
          this.afterCreate(result, createdItem, null, null);
        }, (error: any) => {
          this.afterCreate(result, item, null, error);
        });
    }, 1);
    return result;
  }
  beforeCreate(item: any): EventEmitter<any> {
    this.setStatusItem(EndpointStatusEnum.Creating,
      translate('Creating...')
    );
    return new EventEmitter<any>();
  }
  afterCreate(result: EventEmitter<any>, item: any, response: any, error: any) {
    if (!error) {
      this.localCreate(item);
      result.emit(item);
      this.setStatusItem(EndpointStatusEnum.Ok);
      this.setStatusList(EndpointStatusEnum.Ok);
    } else {
      result.error(this.repositoryHelper.extractError(error));
      this.setStatusItem(EndpointStatusEnum.Invalid,
        translate('Error in creating')
      );
    }
  }
  update(item: any) {
    if (item.validate && item.validate() !== true) {
      return this.validateError(item);
    }
    return this.remoteUpdate(item);
  }
  remoteUpdate(item: any) {
    const result = this.beforeUpdate(item);
    setTimeout(() => {
      this.repositoryHelper.updateItemRequest(this, item)
        .pipe(map((response: any) => this.transformModel(this.repositoryHelper.itemResponse(this, response, item))))
        .subscribe((updatedItem: any) => {
          this.afterUpdate(result, updatedItem, null, null);
        }, (error: any) => {
          this.afterUpdate(result, item, null, error);
        });
    }, 1);
    return result;
  }
  beforeUpdate(item: any): EventEmitter<any> {
    this.setStatusItem(EndpointStatusEnum.Updating,
      translate('Updating...')
    );
    return new EventEmitter<any>();
  }
  afterUpdate(result: EventEmitter<any>, item: any, response: any, error: any) {
    if (!error) {
      this.localUpdate(item);
      result.emit(item);
      this.setStatusItem(EndpointStatusEnum.Ok);
      this.setStatusList(EndpointStatusEnum.Ok);
    } else {
      result.error(this.repositoryHelper.extractError(error));
      this.setStatusItem(EndpointStatusEnum.Invalid,
        translate('Error in updating')
      );
    }
  }
  save(item: any) {
    if (item.length === undefined && item.pk) {
      return this.update(item);
    } else {
      return this.create(item);
    }
  }
  remove(items: any[]) {
    return this.remoteRemove(items);
  }
  beforeRemove(items: any[]): EventEmitter<any> {
    this.setStatusItem(EndpointStatusEnum.Removing,
      translate('Removing...')
    );
    return new EventEmitter<any>();
  }
  afterRemove(result: EventEmitter<any>, items: any[], response: any, error: any) {
    if (!error) {
      const prevLength = this.items.length;
      this.localRemove(items);
      if (prevLength === 0 && this.items.length === 0) {
        result.error({
          error: translate('Not found')
        });
        this.setStatusList(EndpointStatusEnum.NotFound,
          translate('Not found')
        );
      } else {
        if (this.items.length === 0) {
          result.emit({
            message: translate('OK')
          });
          this.setStatusList(EndpointStatusEnum.NotFound,
            translate('Not found')
          );
        } else {
          result.emit({
            message: translate('OK')
          });
          this.setStatusItem(EndpointStatusEnum.Ok);
        }
      }
    } else {
      result.error(this.repositoryHelper.extractError(error));
      this.setStatusItem(EndpointStatusEnum.Invalid,
        translate('Error on deleting')
      );
    }
  }
  remoteRemove(items: any[]) {
    const result = this.beforeRemove(items);
    setTimeout(() => {
      this.repositoryHelper.deleteItemsRequest(this, items)
        .subscribe((response: any) => {
          this.afterRemove(result, items, response, null);
        }, (error: any) => {
          this.afterRemove(result, items, null, error);
        });
    }, 1);
    return result;
  }
}
