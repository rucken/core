import { EventEmitter, Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { EndpointHelper } from '../helpers/endpoint.helper';
import { translate } from './../common/utils';
import { EndpointStatusEnum } from './../enums/endpoint-status.enum';
import { User } from './../models/user.model';
import { TokenService } from './token.service';
import { IBaseService } from '../base/interfaces/base-service.interface';

@Injectable()
export class AccountService implements IBaseService {
  name: string;
  account$: Subject<any | User>;
  apiUrl: string;

  fullAccess = false;

  statusMessage: string;
  changeStatus$: Subject<EndpointStatusEnum>;

  protected _account: any | User;
  protected _status: EndpointStatusEnum;

  endpointHelper: EndpointHelper;
  tokenService: TokenService;

  constructor(
    public injector: Injector
  ) {
    this.account$ = new Subject<any | User>();
    this.changeStatus$ = new Subject<EndpointStatusEnum>();

    this.tokenService = injector.get(TokenService);
    this.endpointHelper = injector.get(EndpointHelper);
    this.name = 'account';
    this.apiUrl = `${this.endpointHelper.apiUrl}/${this.name}`;
  }
  get token(): string | null {
    // you custom code in extended class
    return null;
  }
  set token(value: string | null) {
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
    if (this._account) {
      this._account.fullAccess = this.fullAccess;
    }
    this.account$.next(this._account);
  }
  get account(): any | User {
    return this._account;
  }
  checkPermissions(permissionNames: string[]) {
    if (!this.account) {
      return false;
    }
    return this.account.checkPermissions(permissionNames);
  }
  info(token?: string): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Loading,
      translate('Loading...')
    );
    this.endpointHelper.actionRequest(this, 'info', { 'token': (token ? token : this.tokenService.get()) }).pipe(
      map((response: any) => this.endpointHelper.actionResponse(this, 'info', response))).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.tokenService.set(data.token);
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
  login(account: any | User): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Login...')
    );
    this.endpointHelper.actionRequest(this, 'login', account ? account.formatToAuth() : account, true).pipe(
      map((response: any) => this.endpointHelper.actionResponse(this, 'login', response))).
      subscribe((data: { user: any, token: string } | any) => {
        this.account = this.transformModel(data.user);
        this.tokenService.set(data.token);
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
  logout(): EventEmitter<any> {
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Processing,
      translate('Logout...')
    );
    setTimeout((out: any) => {
      this.account = null;
      this.tokenService.set(null);
      result.emit({ message: 'OK' });
      this.setStatus(EndpointStatusEnum.Ok);
    }, 700);
    return result;
  }
  update(account: any | User): EventEmitter<any> {
    if (account.validate && account.validate() !== true) {
      return this.validateError(account);
    }
    const result = new EventEmitter<any>();
    this.setStatus(EndpointStatusEnum.Updating,
      translate('Updating...')
    );
    this.endpointHelper.actionRequest(this, 'update', account).pipe(
      map((response: any) => this.endpointHelper.actionResponse(this, 'update', response)))
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
  validateError(item: any): EventEmitter<any> {
    const result = new EventEmitter<any>();
    result.error(item.validate());
    this.setStatus(EndpointStatusEnum.Invalid,
      translate('Error')
    );
    return result;
  }
}
