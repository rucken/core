import { Injectable } from '@angular/core';
import { DynamicRepository, Repository } from 'ngx-repository';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../../shared/models/user';
import { AccountStorage } from './account.storage';

export function accountServiceInitializeApp(accountService: AccountService, accountStorage: AccountStorage) {
  return () => accountService.initializeApp();
}

@Injectable()
export class AccountService {

  get current() {
    return this.current$.getValue();
  }
  set current(value: User) {
    this._accountStorage.set(value);
    this.current$.next(value);
  }
  current$ = new BehaviorSubject<User>(undefined);
  repository: Repository<User>;

  constructor(
    private _accountStorage: AccountStorage,
    private _dynamicRepository: DynamicRepository
  ) {
    this.repository = this._dynamicRepository.fork<User>(User);
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.current = this._accountStorage.get();
      resolve();
    });
  }
  login(username: string, password: string): Observable<{ token: string; user: User }> {
    return this.repository.action(
      'login', {
        username: username,
        password: password
      }
    );
  }
  info(token: string): Observable<{ token: string; user: User }> {
    return this.repository.action(
      'info', {
        token: token
      }
    );
  }
  logout(): Observable<boolean> {
    return of(true);
  }
  update(user: User): Observable<{ token: string; user: User }> {
    return this.repository.action(
      'update', user
    );
  }
}
