import { EventEmitter, Input, Output, isDevMode } from '@angular/core';
import { translate } from '@rucken/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BasePromptComponent {

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

  onYesClick(): void {
    if (isDevMode() && this.yes.observers.length === 0) {
      console.warn('No subscribers found for "yes"', this);
    }
    this.yes.emit(this);
  }
  onNoClick(): void {
    if (isDevMode() && this.no.observers.length === 0) {
      console.warn('No subscribers found for "no"', this);
    }
    this.no.emit(this);
  }
}
