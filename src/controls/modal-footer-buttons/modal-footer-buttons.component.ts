import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { translate } from '../../shared/utils';

@Component({
  selector: 'modal-footer-buttons',
  templateUrl: './modal-footer-buttons.component.html',
  styleUrls: ['./modal-footer-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class ModalFooterButtonsComponent extends BaseComponent {

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
