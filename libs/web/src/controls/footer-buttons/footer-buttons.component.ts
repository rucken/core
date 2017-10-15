import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { translate } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'footer-buttons',
  templateUrl: './footer-buttons.component.html',
  styleUrls: ['./footer-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
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
  readonly: boolean;
  @Output()
  onClose: EventEmitter<boolean | any> = new EventEmitter();
  @Output()
  onOk: EventEmitter<boolean | any> = new EventEmitter();
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
