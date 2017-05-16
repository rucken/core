import { HostListener, Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseModalComponent } from './../../base/base-modal/base-modal.component';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent extends BaseModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Input()
  name = 'confirm';
  @Output()
  onClose: EventEmitter<ConfirmModalComponent | any> = new EventEmitter();
  @Output()
  onYes: EventEmitter<ConfirmModalComponent | any> = new EventEmitter();

  yes() {
    this.onYes.emit(this);
    return false;
  }
}
