import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AuthService } from '../modules/auth/services/auth.service';
import { INITED_PERMISSIONS } from './permissions-guard.const';

@Injectable()
export class PermissionsGuard extends NgxPermissionsGuard {
  constructor(
    private _authService: AuthService,
    private _permissionsService: NgxPermissionsService,
    private _rolesService: NgxRolesService,
    private _router: Router
  ) {
    super(_permissionsService, _rolesService, _router);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve: any) => {
      const permissions = this._permissionsService.getPermissions();
      if (permissions[INITED_PERMISSIONS]) {
        resolve(true);
      } else {
        (super.canActivateChild(route, state) as Promise<boolean>).then(result => {
          resolve(result);
        });
      }
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve: any) => {
      const permissions = this._permissionsService.getPermissions();
      if (permissions[INITED_PERMISSIONS]) {
        resolve(true);
      } else {
        (super.canActivate(route, state) as Promise<boolean>).then(result => {
          resolve(result);
        });
      }
    });
  }
}
