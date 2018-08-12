import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  NgxPermissionsGuard,
  NgxPermissionsService,
  NgxRolesService
} from 'ngx-permissions';
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
    if (this._permissionsService.hasPermission(INITED_PERMISSIONS)) {
      return true;
    }
    return super.canActivateChild(route, state);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (this._permissionsService.hasPermission(INITED_PERMISSIONS)) {
      return true;
    }
    return super.canActivate(route, state);
  }
}
