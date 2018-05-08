import { Injector, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Pipe({ name: 'perm' })
export class PermPipe implements PipeTransform, OnDestroy {

  private _permissionsService: NgxPermissionsService;
  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public injector: Injector
  ) {
    this._permissionsService = injector.get(NgxPermissionsService);
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  transform(key: string | string[], defaultValue: boolean = true, trueValue: any = true, falseValue: any = false): any {
    return new Observable<boolean>(observer =>
      this._permissionsService.permissions$.pipe(
        takeUntil(this._destroyed$)
      ).subscribe(permissions => {
        if (Object.keys(permissions).length) {
          this._permissionsService.hasPermission(key).then(result => {
            observer.next(result ? trueValue : falseValue);
          });
        } else {
          observer.next(defaultValue ? trueValue : falseValue);
        }
      })
    );
  }
}
