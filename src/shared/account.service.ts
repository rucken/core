import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper } from './helpers/endpoint.helper';
import { ResouceEnumStatus } from './enums/resource.enums';
import { translate } from './utils';
import { User } from './models/user.model';

@Injectable()
export class AccountService {
  public name: string;
  public account$: Subject<any | User>;
  public _account: any | User;
  public apiUrl: string;

  public statusMessage: string;
  public _status: ResouceEnumStatus;
  public changeStatus$: Subject<ResouceEnumStatus> = <Subject<ResouceEnumStatus>>new Subject();

  constructor(public endpointHelper: EndpointHelper) {
    this.name = 'account';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.name}`;
  }
  get statusList() {
    return this._status;
  }
  setStatus(status: ResouceEnumStatus, message?: string) {
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
  public set account(user: any | User) {
    this._account = user;
    this.account$.next(this._account);
  }
  public get account(): any | User {
    return this._account;
  }
  public info() {
    const result = new EventEmitter();
    this.setStatus(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    this.endpointHelper.actionRequest(this, 'info').map(
      (response: any) => this.endpointHelper.actionResponse(this, 'info', response)).
      subscribe((user: any | User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          translate('Error')
        );
      });
    return result;
  }
  public login(account: any | User) {
    const result = new EventEmitter();
    this.setStatus(ResouceEnumStatus.Loading,
      translate('Loading...')
    );
    this.endpointHelper.actionRequest(this, 'login', account.AsLoginUser).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'login', response)).
      subscribe((user: any | User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, (error: any) => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          translate('Error')
        );
      });
    return result;
  }
  public logout() {
    const result = new EventEmitter();
    setTimeout((out: any) => {
      this.account = null;
      result.emit({ message: 'OK' });
    }, 700);
    return result;
  }
  public update(account: any | User) {
    const result = new EventEmitter();
    this.setStatus(ResouceEnumStatus.Updating,
      translate('Updating...')
    );
    this.endpointHelper.actionRequest(this, 'update', account).map(
      (response: any) => this.endpointHelper.actionResponse(this, 'update', response))
      .subscribe((user: any | User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, (error: any) => {
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          translate('Error')
        );
      });
    return result;
  }
}
