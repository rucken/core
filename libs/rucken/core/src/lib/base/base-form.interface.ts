import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class IBaseForm {
  processing: boolean;
  processing$: BehaviorSubject<boolean>;
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
  noClass: string;
  hideNo: boolean;
  hideYes: boolean;
  readonly: boolean;
  yesData: any;
  noData: any;
  onNoClick: (data?: any) => void;
  onYesClick: (data?: any) => void;
}
