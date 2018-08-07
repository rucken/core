import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { DynamicRepository, Repository } from 'ngx-repository';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../../shared/models/user';
import { EMPTY_PERMISSIONS, INITED_PERMISSIONS } from '../../../shared/utils/permissions-guard.service';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from '../configs/auth.config';
import { IAuthConfig } from '../interfaces/auth-config.interface';
import { UserTokenDto } from '../dto/user-token.dto';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

export function authServiceInitializeApp(authService: AuthService) {
    return () => authService.initializeApp();
}

@Injectable()
export class AuthService {

    get current() {
        return this.current$.getValue();
    }
    set current(value: User) {
        if (!value) {
            this.clearPermissions();
            this.current$.next(undefined);
        } else {
            if (value.permissionNames.length) {
                this.loadPermissions(value);
                this.current$.next(value);
            } else {
                this.clearPermissions();
                this.current$.next(undefined);
            }
        }
    }
    current$ = new BehaviorSubject<User>(undefined);

    constructor(
        @Inject(AUTH_CONFIG_TOKEN) private _authConfig: IAuthConfig,
        private _httpClient: HttpClient,
        private _permissionsService: NgxPermissionsService
    ) {
        this._authConfig = { ...defaultAuthConfig, ...this._authConfig };
        this.initPermissions();
    }
    initializeApp() {
        return new Promise((resolve, reject) => {
            this.current = this.current;
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
    login(
        email: string,
        password: string
    ): Observable<UserTokenDto> {
        return this._httpClient.post(
            this._authConfig.apiUri +
            this._authConfig.loginUri, {
                email,
                password
            }).pipe(map(data => plainToClass(UserTokenDto, data)));
    }
    info(
        token: string
    ): Observable<UserTokenDto> {
        return this._httpClient.post(
            this._authConfig.apiUri +
            this._authConfig.infoUri, {
                token
            }).pipe(map(data => plainToClass(UserTokenDto, data)));
    }
    logout(): Observable<boolean> {
        return of(true);
    }
    register(
        email: string,
        password: string,
        username?: string,
        firstName?: string,
        lastName?: string
    ): Observable<UserTokenDto> {
        return this._httpClient.post(
            this._authConfig.apiUri +
            this._authConfig.registerUri, {
                email,
                password,
                username,
                firstName,
                lastName
            }).pipe(map(data => plainToClass(UserTokenDto, data)));
    }
}
