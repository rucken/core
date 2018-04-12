import { Injector, Pipe, PipeTransform } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs/Observable';

@Pipe({ name: 'perm' })
export class PermPipe implements PipeTransform {

  private _permissionsService: NgxPermissionsService;

  constructor(
    public injector: Injector
  ) {
    this._permissionsService = injector.get(NgxPermissionsService);
  }
  transform(value: string | string[], args: any): any {
    return new Observable<boolean>(observer => {
      this._permissionsService.hasPermission(value).then(result =>
        observer.next(result)
      );
    });
  }
}
