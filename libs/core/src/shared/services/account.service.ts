import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper } from '../helpers/endpoint.helper';
import { EndpointStatusEnum } from './../enums/endpoint-status.enum';
import { translate } from './../utils/utils';
import { User } from './../models/user.model';

@Injectable()
export class AccountService {
  name: string;
  account$: Subject<any | User>;
  apiUrl: string;

  statusMessage: string;
  changeStatus$: Subject<EndpointStatusEnum> = <Subject<EndpointStatusEnum>>new Subject();

  protected _account: any | User;
  protected _status: EndpointStatusEnum;
  protected _cachedPermissions: { [permissions: string]: boolean };

  constructor(public endpointHelper: EndpointHelper) {
    this.name = 'account';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.name}`;
    this.account$ = <Subject<User>>new Subject();
    this.account$.subscribe(user => this._cachedPermissions = {});
  }
  get token() {
    // you custom code in extended class
    return null;
  }
  set token(value: string) {
    // you custom code in extended class
  }
  transformModel(item: any) {
    return new User(item);
  }
  get status() {
    return this._status;
  }
  setStatus(status: EndpointStatusEnum, message?: string) {
    this._status = status;
    setTimeout((out: any) => {
      if (message) {
        this.statusMessage = message;
      } else {
        this.statusMessage = '';
      }
      this.changeStatus$.next(status);
    });
  }
  set account(user: any | User) {
    this._account = user;
    this.account$.next(this._account);
  }
  get account(): any | User {
    return this._account;
  }
  checkPermissions(permissionNames: string[]) {
    if (!this.account) {
      return false;
    }
    const key = JSON.stringify(permissionNames);
    if (this._cachedPermissions[key] === undefined) {
      this._cachedPermissions[key] = this.account.checkPermissions(permissionNames);
    }
    return this._cachedPermissions[key];
  }
  info(token?: string) {
    const result = new EventEmitter();
    this.setStatus(EndpointStatusEnum.Loading,
      translate('Loading...')
    );
    this.endpointHelper.actionRequest(this, 'info', { 'token': (token ? token : this.token) }).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'info', response)).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.token = data.token;
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
  login(account: any | User) {
    const result = new EventEmitter();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Login...')
    );
    this.endpointHelper.actionRequest(this, 'login', account.formatToAuth(), true).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'login', response)).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.token = data.token;
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
  logout() {
    const result = new EventEmitter();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Logout...')
    );
    setTimeout((out: any) => {
      this.account = null;
      this.token = null;
      result.emit({ message: 'OK' });
      this.setStatus(EndpointStatusEnum.Ok);
    }, 700);
    return result;
  }
  update(account: any | User) {
    const result = new EventEmitter();
    this.setStatus(EndpointStatusEnum.Updating,
      translate('Updating...')
    );
    this.endpointHelper.actionRequest(this, 'update', account).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'update', response))
      .subscribe((user: any | User) => {
        this.account = this.transformModel(user);
        result.emit(this.account);
        this.setStatus(EndpointStatusEnum.Ok);
      }, (error: any) => {
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(EndpointStatusEnum.Error,
          translate('Error')
        );
      });
    return result;
  }
}
