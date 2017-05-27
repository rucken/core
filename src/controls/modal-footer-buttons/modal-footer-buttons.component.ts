import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'modal-footer-buttons',
  templateUrl: './modal-footer-buttons.component.html',
  styleUrls: ['./modal-footer-buttons.component.scss']
})

export class ModalFooterButtonsComponent extends BaseComponent {

  @Input()
  cancelTitle?: string;
  @Input()
  okTitle?: string;
  @Input()
  readonly: boolean;
  @Output()
  onClose: EventEmitter<boolean | any> = new EventEmitter();

  constructor(public translateService: TranslateService) {
    super();
    if (this.cancelTitle === undefined) {
      this.cancelTitle = 'Cancel';
    }
  }
  close() {
    this.onClose.emit(true);
    return false;
  }
}
