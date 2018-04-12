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
  if (value) {
    const curr_date = value.getDate();
    const curr_month = value.getMonth() + 1;
    const curr_year = value.getFullYear();
    return curr_year + '-' + curr_month + '-' + curr_date;
  }
  return value;
}
export function serializeModel<T>(object: T) {
  return function() {
    return object;
  };
}
