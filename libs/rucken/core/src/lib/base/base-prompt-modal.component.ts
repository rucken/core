import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { translate } from '../utils/translate';
import { IBaseForm } from './base-form.interface';

export class BasePromptModalComponent implements IBaseForm {
  @BindObservable()
  @Input()
  processing = false;
  processing$: Observable<boolean>;
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

  @Input()
  hideOnNo = true;
  @Input()
  hideOnYes = false;

  yesData: any;
  noData: any;

  modalRef: IModalRef<BasePromptModalComponent>;

  onYesClick(data?: any): void {
    this.yesData = data;
    this.yes.emit(this);
    if (this.hideOnYes && this.modalRef) {
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
    if (this.hideOnNo && this.modalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  hide() {
    this.modalRef.hide();
  }
}
