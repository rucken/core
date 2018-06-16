import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { DynamicRepository, Repository } from 'ngx-repository';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';
import { AccountStorage } from './account.storage';
import { INITED_PERMISSIONS, EMPTY_PERMISSIONS } from '@rucken/core/lib/shared/utils/permissions-guard.service';

export function accountServiceInitializeApp(accountService: AccountService) {
  return () => accountService.initializeApp();
}

@Injectable()
export class AccountService {

  get current() {
    return this.current$.getValue();
  }
  set current(value: User) {
    if (!value) {
      this._accountStorage.set(undefined);
      this.clearPermissions();
    } else {
      if (value.permissionNames.length) {
        this._accountStorage.set(value);
        this.loadPermissions(value);
      } else {
        this.clearPermissions();
      }
    }
    this.current$.next(value);
  }
  current$ = new BehaviorSubject<User>(undefined);
  repository: Repository<User>;

  constructor(
    private _accountStorage: AccountStorage,
    private _dynamicRepository: DynamicRepository,
    private _permissionsService: NgxPermissionsService
  ) {
    this.repository = this._dynamicRepository.fork<User>(User);
    this.initPermissions();
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      if (this.current !== this._accountStorage.get()) {
        this.current = this._accountStorage.get();
      }
      resolve();
    });
  }
  protected initPermissions() {
    this._permissionsService.loadPermissions([INITED_PERMISSIONS]);
  }
  protected clearPermissions() {
    this._permissionsService.loadPermissions([EMPTY_PERMISSIONS]);
  }
  protected loadPermissions(value: User) {
    this._permissionsService.loadPermissions(value.permissionNames);
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
