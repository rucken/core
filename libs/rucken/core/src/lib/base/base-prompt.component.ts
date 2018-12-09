import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { translate } from '../utils/translate';
import { IBaseForm } from './base-form.interface';

export class BasePromptComponent implements IBaseForm {
  @Input()
  set processing(value: boolean) {
    this.processing$.next(value);
  }
  get processing() {
    return this.processing$.getValue();
  }
  processing$ = new BehaviorSubject(false);
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
  @Input()
  yesClass = 'btn btn-primary';
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
