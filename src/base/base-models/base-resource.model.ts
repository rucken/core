import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { translate } from './../../shared/utils';

export class BaseResourceModel {
  className = 'ResourceModel';
  pkFieldName: string;
  pkIsNumber: boolean;
  dateAsStringFormat = 'DD.MM.YYYY';
  dateInputFormat = 'YYYY-MM-DD';
  [key: string]: any;

  get pk(): string | number {
    const key = this.pkFieldName;
    return this[key];
  }
  static meta(): any {
    const meta: any = BaseResourceModel;
    return meta;
  }

  constructor(obj?: any) {
    if (this.pkFieldName === undefined) {
      this.pkFieldName = 'id';
    }
    if (this.pkIsNumber === undefined) {
      this.pkIsNumber = true;
    }
    if (obj && (_.isNumber(obj) || _.isString(obj))) {
      const newObj: any = {};
      newObj[this.pkFieldName] = obj;
      obj = newObj;
    }
    this.parse(obj ? obj : {});
  }
  parse(obj: any) {
    const current: any = this.constructor;
    this.parseByFields(obj, current.meta());
  }
  parseByFields(obj: any, meta: any) {
    const fields: string[] = meta.fields ? meta.fields : [];
    const dateFields: string[] = meta.dateFields ? meta.dateFields : [];
    for (let i = 0; i < fields.length; i++) {
      this[fields[i]] = null;
    }
    if (fields.length > 0) {
      for (const key in obj) {
        if (fields.indexOf(key) !== -1) {
          try {
            this[key] = obj[key];
          } catch (err) {

          }
        }
      }
    }
    if (dateFields.length > 0) {
      for (const key in obj) {
        if (dateFields.indexOf(key) !== -1) {
          try {
            this[key] = moment(obj[key]).toDate();
          } catch (err) {
            this[key] = null;
          }
          if (this[key] === 'Invalid date') {
            this[key] = null;
          }
        }
      }
    }
    if (this.pkIsNumber) {
      this[this.pkFieldName] = +obj[this.pkFieldName];
    }
  }
  format() {
    const current: any = this.constructor;
    const result = this.formatByFields(current.meta());
    return result;
  }
  formatByFields(meta: any): any {
    const obj: any = {};
    const fields: string[] = meta.fields ? meta.fields : [];
    const dateFields: string[] = meta.dateFields ? meta.dateFields : [];
    if (fields.length > 0) {
      for (const key in this) {
        if (fields.indexOf(key) !== -1) {
          try {
            obj[key] = this[key];
          } catch (err) {
          }
        }
      }
    }
    if (dateFields.length > 0) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      for (const key in this) {
        if (dateFields.indexOf(key) !== -1) {
          if (obj[key]) {
            try {
              obj[key] = moment(+moment(this[key]).toDate() - tzoffset).toISOString().slice(0, -1);
            } catch (err) {
              this[key] = null;
            }
            if (obj[key] === 'Invalid date') {
              obj[key] = null;
            }
          } else {
            obj[key] = null;
          }
        }
      }
    }
    return obj;
  }
  dateAsString(fieldName: string) {
    let text: string;
    text = '';
    if (this[fieldName] !== undefined) {
      try {
        text = moment(this[fieldName]).format(this.dateAsStringFormat);
      } catch (err) {
        text = '';
      }
      if (text === 'Invalid date') {
        text = '';
      }
    }
    return text;
  }
  getDateInput(fieldName: string) {
    if (this[fieldName] === undefined) {
      return '';
    }
    let value: string;
    value = '';
    try {
      value = moment(this[fieldName]).format(this.dateInputFormat);
    } catch (err) {
      value = '';
    }
    if (value === 'Invalid date') {
      value = '';
    }
    return value;
  }
  setDateInput(fieldName: string, value: any) {
    if (this[fieldName] === undefined) {
      this[fieldName] = null;
      return;
    }
    try {
      value = moment(value, this.dateInputFormat).toDate();
    } catch (err) {
      value = null;
    }
    if (value === 'Invalid date') {
      value = null;
    }
    this[fieldName] = value;
  }
  booleanAsString(value: boolean) {
    if (value) {
      return translate('Yes');
    } else {
      return translate('No');
    }
  }
  validate() {
    const result: any = {};
    let valid: boolean;
    valid = true;
    if (valid === true) {
      return valid;
    }
    return result;
  }
}
