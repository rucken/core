import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export class IBaseForm {
  processing: boolean;
  processing$: Observable<boolean>;
  data?: any;
  title: string;
  message: string;
  infoMessage: string;
  errorMessage: string;
  noTitle: string;
  yesTitle: string;
  no: EventEmitter<any>;
  yes: EventEmitter<any>;
  disabled: boolean;
  yesClass: string;
  yesClass$: Observable<string>;
  noClass: string;
  noClass$: Observable<string>;
  hideNo: boolean;
  hideYes: boolean;
  readonly: boolean;
  yesData: any;
  noData: any;
  onNoClick: (data?: any) => void;
  onYesClick: (data?: any) => void;
}
