import { HttpHelper } from '../shared/helpers/http.helper';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { User } from './models/user.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper } from './helpers/endpoint.helper';
import { ResouceEnumStatus } from '../../src/shared/enums/resource.enums';
@Injectable()
export class AccountService {
  public mame: string;
  public account$: Subject<User>;
  private _account: User;
  public apiUrl: string;

  public statusMessage: string;
  private _status: ResouceEnumStatus;
  public changeStatus$: Subject<ResouceEnumStatus> = <Subject<ResouceEnumStatus>>new Subject();

  constructor(
    public httpHelper: HttpHelper,
    public authHttp: AuthHttp,
    public endpointHelper: EndpointHelper) {
    this.mame = 'account';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.mame}`;
    this.account$ = <Subject<User>>new Subject();
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
  public set account(user: User) {
    this._account = user;
    this.account$.next(this._account);
  }
  public get account(): User {
    return this._account;
  }
  public info() {
    let result = new EventEmitter();
    if (localStorage.getItem('token') === null) {
      this.account = null;
      return result;
    }
    this.setStatus(ResouceEnumStatus.Loading,
      'Loading...'//translate
    );
    this.authHttp.post(this.endpointHelper.getResourceItemUrl(this, 'info'), { 'token': localStorage.getItem('token') })
      .map(endpointHelper => {
        if (endpointHelper.json().token) {
          localStorage.setItem('token', endpointHelper.json().token);
        }
        return new User(endpointHelper.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, error => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          'Error'//translate
        );
      });
    return result;
  }
  public login(account: any | User) {
    let result = new EventEmitter();
    this.setStatus(ResouceEnumStatus.Loading,
      'Loading...'//translate
    );
    this.authHttp.post(this.endpointHelper.getResourceItemUrl(this, 'login'), account.AsLoginUser)
      .map(endpointHelper => {
        if (endpointHelper.json().token) {
          localStorage.setItem('token', endpointHelper.json().token);
        }
        return new User(endpointHelper.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, error => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          'Error'//translate
        );
      });
    return result;
  }
  public logout() {
    let result = new EventEmitter();
    localStorage.removeItem('token');
    setTimeout((out: any) => {
      this.account = null;
      result.emit({ message: 'OK' });
    }, 700);
    return result;
  }
  public update(account: any | User) {
    let result = new EventEmitter();
    this.setStatus(ResouceEnumStatus.Updating,
      'Updating...'//translate
    );
    this.httpHelper.put(this.endpointHelper.getResourceItemUrl(this), account)
      .map(endpointHelper => new User(endpointHelper.json().user)).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
        this.setStatus(ResouceEnumStatus.Ok);
      }, error => {
        result.error(this.endpointHelper.extractError(error));
        this.setStatus(ResouceEnumStatus.Error,
          'Error'//translate
        );
      });
    return result;
  }
}
