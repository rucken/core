import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserTokenDto } from '../dto/user-token.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class OauthGuard implements CanActivate {
  constructor(public authService: AuthService, public tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const provider =
      route.routeConfig.data && route.routeConfig.data.oauth ? route.routeConfig.data.oauth.provider : 'empty';
    const redirectToIfSuccess =
      route.routeConfig.data && route.routeConfig.data.oauth && route.routeConfig.data.oauth.redirectTo
        ? route.routeConfig.data.oauth.redirectTo.ifSuccess
        : '/home';
    const redirectToIfFail =
      route.routeConfig.data && route.routeConfig.data.oauth && route.routeConfig.data.oauth.redirectTo
        ? route.routeConfig.data.oauth.redirectTo.ifFail
        : '/home';
    return new Promise((resolve, reject) => {
      this.authService
        .oauthSignIn(provider, route.queryParams.code)
        .pipe(first())
        .subscribe(
          (data: UserTokenDto) => {
            this.tokenService.setCurrent(data.token);
            this.authService.setCurrent(data.user);
            this.router.navigate([redirectToIfSuccess]);
            resolve(true);
          },
          error => {
            this.router.navigate([redirectToIfFail]);
            resolve(false);
          }
        );
    });
  }
}
