import { plainToClass } from 'class-transformer';

export function transformStringToObject(value: string | Object) {
  if (typeof value === 'string') {
    return null;
  }
  return value;
}
export function transformStringToDate(value: string) {
  return value && value.substring ? new Date(value.substring(0, 10)) : value;
}
export function transformDateToString(value: Date) {
  if (value && value.getDate && value.getMonth && value.getFullYear) {
    const curr_date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    const curr_month = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1;
    const curr_year = value.getFullYear();
    return curr_year + '-' + curr_month + '-' + curr_date;
  }
  return value;
}
export function serializeModel<T>(object: T) {
  return function () {
    return object;
  };
}

export function serializeIdToObject<T>(object: T, isArray = false, fieldName = 'id') {
  if (isArray) {
    return function (values: number[]) {
      return values.map(value => plainToClass(object as any, { [fieldName]: value }));
    };
  }
  return function (value: number) {
    return plainToClass(object as any, { [fieldName]: value });
  };
}
export function serializeObjectToId<T>(object: T, isArray = false, fieldName = 'id') {
  if (isArray) {
    return function (values: T[]) {
      return values.map(value => value ? (value as any)[fieldName] : undefined);
    };
  }
  return function (value: T) {
    return value ? (value as any)[fieldName] : undefined;
  };
}
