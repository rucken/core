import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { translate } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { IBaseForm } from './base-form.interface';

export class BasePromptModalComponent implements IBaseForm {
  @Input()
  set processing(value: boolean) {
    this.processing$.next(value);
  }
  get processing() {
    return this.processing$.getValue();
  }
  processing$ = new BehaviorSubject(false);
  @Input()
  checkIsDirty?: boolean;
  @Input()
  data?: any;
  @Input()
  focused = false;
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

  @Input()
  hideOnNo = true;
  @Input()
  hideOnYes = false;

  yesData: any;
  noData: any;

  constructor(protected bsModalRef: BsModalRef) {}
  onYesClick(data?: any): void {
    this.yesData = data;
    this.yes.emit(this);
    if (this.hideOnYes) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  onNoClick(data?: any): void {
    this.noData = data;
    this.no.emit(this);
    if (this.hideOnNo) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  hide() {
    this.bsModalRef.hide();
  }
}
