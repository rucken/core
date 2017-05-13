import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'modal-footer-buttons',
  templateUrl: './modal-footer-buttons.component.html',
  styleUrls: ['./modal-footer-buttons.component.scss']
})

export class ModalFooterButtonsComponent extends BaseComponent {

  @Input()
  public cancelTitle?: string;
  @Input()
  public okTitle?: string;
  @Input()
  public readonly: boolean;
  @Output()
  public onClose: EventEmitter<boolean | any> = new EventEmitter();

  constructor(public translateService: TranslateService) {
    super();
    if (this.cancelTitle === undefined) {
      this.cancelTitle = this.translateService.instant('Cancel');
    }
  }
  close() {
    this.onClose.emit(true);
    return false;
  }
}
