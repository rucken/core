import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService, AppService, EndpointStatusEnum } from '@rucken/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    protected accountService: AccountService,
    protected router: Router,
    protected app: AppService,
    protected translateService: TranslateService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.app.component &&
      !this.accountService.account &&
      this.accountService.status !== EndpointStatusEnum.Loading
    ) {
      this.app.component.showErrorModal(
        this.translateService.instant('You are not logged in')
      );
      if (route.data && route.data.name !== 'home') {
        this.router.navigate(['/home']);
      }
    }
    return true;
  }
}
