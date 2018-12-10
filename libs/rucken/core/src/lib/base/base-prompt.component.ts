import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';
import { translate } from '../utils/translate';
import { IBaseForm } from './base-form.interface';

export class BasePromptComponent implements IBaseForm {
  @BindObservable()
  @Input()
  processing = false;
  processing$: Observable<boolean>;
  @Input()
  data?: any;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  infoMessage: string;
  @Input()
  errorMessage: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();
  @Input()
  disabled: boolean;

  @BindObservable()
  @Input()
  yesClass: string;
  yesClass$: Observable<string>;
  @BindObservable()
  @Input()
  noClass: string;
  noClass$: Observable<string>;

  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;

  yesData: any;
  noData: any;

  onYesClick(data?: any): void {
    this.yesData = data;
    if (isDevMode() && this.yes.observers.length === 0) {
      console.warn('No subscribers found for "yes"', this);
    }
    this.yes.emit(this);
  }
  onNoClick(data?: any): void {
    this.noData = data;
    if (isDevMode() && this.no.observers.length === 0) {
      console.warn('No subscribers found for "no"', this);
    }
    this.no.emit(this);
  }
}
