import { Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'customTranslate' })
export class CustomTranslatePipe implements PipeTransform {

  private _translateService: TranslateService;

  constructor(
    public injector: Injector
  ) {
    this._translateService = injector.get(TranslateService);
  }

  transform(value: string, args: any): any {
    if (value && !Array.isArray(value) && typeof value !== 'object') {
      value = this._translateService.instant(value);
    }
    const newArgs: any = {};
    for (const key in args) {
      if (args[key]) {
        if (typeof args[key] === 'string') {
          newArgs[key] = this._translateService.instant(args[key]);
        } else {
          if (typeof args[key] === 'number') {
            newArgs[key] = args[key].toString();
          }
        }
      }
    }
    try {
      value = this._translateService.parser.interpolate(value, newArgs);
    } catch (error) {

    }
    return value;
  }
}
