import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Pipe({ name: 'customTranslate' })
export class CustomTranslatePipe implements PipeTransform {
  constructor(
    private _translateService: TranslateService
  ) { }
  transform(value: string, args: any): any {
    const newArgs: any = {};
    let key = '';
    for (key in args) {
      if (args[key]) {
        newArgs[key] = this._translateService.instant(args[key]);
      }
    }
    value = this._translateService.parser.interpolate(value, newArgs);
    for (key in args) {
      if (args[key]) {
        value = _.replace(value, new RegExp(args[key], 'g'), this._translateService.instant(args[key]))
      }
    }
    return value;
  }
}
