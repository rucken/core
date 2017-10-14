import * as _ from 'lodash';

export function translate(key: string): string {
  return key;
}
export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export function inValues(item: any, q: string) {
  let founded = false;
  for (const key in item) {
    if (!founded && item.hasOwnProperty(key) && key[0] !== '_') {
      let value: any = item[key];
      if (!_.isString(value)) {
        if (value['asString'] === undefined) {
          value = value.toString();
        } else {
          value = value.asString;
        }
      }
      if (value.indexOf(q) !== -1) {
        founded = true;
      }
    }
  }
  return founded;
}
