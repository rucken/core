import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs';

export const INITED_PERMISSIONS = '__inited__';
export const EMPTY_PERMISSIONS = '__empty__';

@Injectable()
export class PermissionsGuard extends NgxPermissionsGuard {
  constructor(
    private _permissionsService: NgxPermissionsService,
    private _rolesService: NgxRolesService,
    private _router: Router
  ) {
    super(_permissionsService, _rolesService, _router);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve: any) => {
      this._permissionsService.hasPermission(INITED_PERMISSIONS).then(result =>
        result ? resolve(true) : resolve(super.canActivateChild(route, state))
      );
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return new Promise((resolve: any) => {
      this._permissionsService.hasPermission(INITED_PERMISSIONS).then(result =>
        result ? resolve(true) : resolve(super.canActivate(route, state))
      );
    });
  }
}
