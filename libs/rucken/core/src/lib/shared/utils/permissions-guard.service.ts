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
