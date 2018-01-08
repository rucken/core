import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { translate } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html'
})

export class FooterButtonsComponent extends BaseComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  closeBtnClass = 'btn-default';
  @Input()
  okBtnClass = 'btn-primary';
  @Input()
  closeTitle = translate('Cancel');
  @Input()
  okTitle = translate('OK');
  @Input()
  readonly?: boolean;
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  onOk: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  okInProcess = false;
  @Input()
  closeHidden = false;

  close() {
    this.onClose.emit(true);
    return false;
  }
  ok() {
    this.onOk.emit(true);
    return false;
  }
}
