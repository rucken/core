import { HttpService } from '../shared/http.service';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { User } from './models/user.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ResponseService } from './response.service';
@Injectable()
export class AccountService {
  public account$: Subject<User>;
  private _account: User;
  constructor(
    public http: HttpService,
    public authHttp: AuthHttp,
    public response: ResponseService) {
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
    return `${this.response.apiUrl}/account`;
  }
  public info() {
    let result = new EventEmitter();
    if (localStorage.getItem('token') === null) {
      this.account = null;
      return result;
    }
    this.authHttp.post(`${this.apiUrl}/info`, { 'token': localStorage.getItem('token') })
      .map(response => {
        if (response.json().token) {
          localStorage.setItem('token', response.json().token);
        }
        return new User(response.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        this.account = null;
        result.error(this.response.extractError(error));
      });
    return result;
  }
  public login(account: any | User) {
    let result = new EventEmitter();
    this.authHttp.post(`${this.apiUrl}/login`, account.AsLoginUser)
      .map(response => {
        if (response.json().token) {
          localStorage.setItem('token', response.json().token);
        }
        return new User(response.json().user);
      }).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        this.account = null;
        result.error(this.response.extractError(error));
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
    this.http.put(`${this.apiUrl}`, account)
      .map(response => new User(response.json().user)).subscribe((user: User) => {
        this.account = user;
        result.emit(this.account);
      }, error => {
        result.error(this.response.extractError(error));
      });
    return result;
  }
}
