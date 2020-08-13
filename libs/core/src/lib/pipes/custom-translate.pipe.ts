import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'customTranslate' })
export class CustomTranslatePipe implements PipeTransform {
  constructor(private _translateService: TranslateService) {}
  transform(
    value:
      | string
      | {
          text: string;
          data: {
            [key: string]: string;
          };
        },
    words?: any
  ): any {
    if (words === undefined) {
      words = {};
    }
    if (typeof value !== 'string' && (value && value.text && value.data)) {
      words = { ...words, ...value.data };
      value = value.text;
    }
    if (value && !Array.isArray(value) && typeof value !== 'object') {
      value = this._translateService.instant(value);
    }
    const newArgs: any = {};
    for (const key in words) {
      if (words[key]) {
        if (typeof words[key] === 'string') {
          newArgs[key] = this._translateService.instant(words[key]);
        } else {
          if (typeof words[key] === 'number') {
            newArgs[key] = words[key].toString();
          }
        }
      }
    }
    try {
      value = this._translateService.parser.interpolate(String(value), newArgs);
    } catch (error) {}
    return value;
  }
}
