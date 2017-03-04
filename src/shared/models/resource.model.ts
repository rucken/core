import { isMoment } from 'moment';
import * as moment from 'moment/moment';
import * as _ from 'lodash';


export class ResourceModel {
  private _pkFieldName: string;
  private _pkIsNumber: boolean;
  [key: string]: any;

  constructor(obj?: any, pkFieldName?: string, pkIsNumber?: boolean) {
    if (pkFieldName === undefined) {
      pkFieldName = 'id';
    }
    if (pkIsNumber === undefined) {
      pkIsNumber = true;
    }
    this._pkFieldName = pkFieldName;
    this._pkIsNumber = pkIsNumber;
    if (obj && (_.isNumber(obj) || _.isString(obj))) {
      let newObj: any = {};
      newObj[this._pkFieldName] = obj;
      obj = newObj;
    }
    this.parse(obj ? obj : {});
  }
  static get meta(): any {
    let meta: any = ResourceModel;
    return meta;
  }
  get pk(): string | number {
    let key = this._pkFieldName;
    return this[key];
  }
  get pkFieldName() {
    return this._pkFieldName;
  }
  parse(obj: any) {

  }
  parseByFields(obj: any, meta: any) {
    let key: any;
    let fields: string[] = meta.fields ? meta.fields : [];
    let dateFields: string[] = meta.dateFields ? meta.dateFields : [];
    if (fields.length > 0) {
      for (key in obj) {
        if (fields.indexOf(key) !== -1) {
          try {
            this[key] = obj[key];
          } catch (err) {

          }
        }
      }
    }
    if (dateFields.length > 0) {
      for (key in obj) {
        if (dateFields.indexOf(key) !== -1) {
          try {
            this[key] = moment(obj[key]).toDate();
          } catch (err) {

          }
        }
      }
    }
    if (this._pkIsNumber) {
      this[this._pkFieldName] = +obj[this._pkFieldName];
    }
  }
  format() {
  }
  formatByFields(meta: any): any {
    let obj: any = {};
    let key: any;
    let fields: string[] = meta.fields ? meta.fields : [];
    let dateFields: string[] = meta.dateFields ? meta.dateFields : [];
    if (fields.length > 0) {
      for (key in this) {
        if (fields.indexOf(key) !== -1) {
          try {
            obj[key] = this[key];
          } catch (err) {
          }
        }
      }
    }
    if (dateFields.length > 0) {
      for (key in this) {
        if (dateFields.indexOf(key) !== -1) {
          try {
            obj[key] = moment(this[key]).toISOString();
          } catch (err) {
          }
        }
      }
    }
    return obj;
  }
  validate() {
    let result: any = {};
    let valid: boolean = true;
    if (valid === true) {
      return valid;
    }
    return result;
  }
}
