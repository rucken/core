import { HttpHelper } from '../../../../../src';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../../../../src';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper } from '../../../../../src';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
@Injectable()
export class DemoAccountService {
  public account$: Subject<User>;
  private _account: User;
  constructor(
    public httpHelper: HttpHelper,
    public authHttp: AuthHttp,
    //public authHttp: Http,
    public endpointHelper: EndpointHelper) {
    this.account$ = <Subject<User>>new Subject();
  }
  public set account(user: User) {
    this._account = user;
    this.account$.next(this._account);
  }
  public get account(): User {
    return this._account;
  }
  public get apiUrl() {
    return `${this.endpointHelper.apiUrl}/account`;
  }
  public info() {
    let result = new EventEmitter();
    if (localStorage.getItem('token') === null) {
      this.account = null;
      return result;
    }
    this.authHttp.post(`${this.apiUrl}${environment.accountInfoAction}`, { 'token': localStorage.getItem('token') })
    //this.authHttp.get(`${this.apiUrl}${environment.accountInfoAction}`)
      .map(endpointHelper => {
        if (endpointHelper.json().token) {
          localStorage.setItem('token', endpointHelper.json().token);
        }
        return new User(endpointHelper.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
      });
    return result;
  }
  public login(account: User) {
    let result = new EventEmitter();
    this.authHttp.post(`${this.apiUrl}${environment.accountLoginAction}`, account.AsLoginUser)
    //this.authHttp.get(`${this.apiUrl}${environment.accountLoginAction}`)
      .map(endpointHelper => {
        if (endpointHelper.json().token) {
          localStorage.setItem('token', endpointHelper.json().token);
        }
        return new User(endpointHelper.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        this.account = null;
        result.error(this.endpointHelper.extractError(error));
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
  public update(account: User) {
    let result = new EventEmitter();
    this.httpHelper.put(`${this.apiUrl}`, account)
      .map(endpointHelper => new User(endpointHelper.json().user)).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        result.error(this.endpointHelper.extractError(error));
      });
    return result;
  }
}
