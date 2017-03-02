import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Input()
  text: string = '';
  @Input()
  class: string = '';
  @Input()
  hideOnClose?: boolean;
  @Input()
  size?: string = 'sm';
  @Input()
  title?: string = '';
  @Input()
  hideButton?: boolean;
  @Input()
  message: string = '';
  @Output()
  onClose: EventEmitter<ConfirmModalComponent | any> = new EventEmitter();
  @Output()
  onYes: EventEmitter<ConfirmModalComponent | any> = new EventEmitter();

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  yes() {
    this.onYes.emit(this);
    return false;
  }

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }
  init() {
    if (!this.title) {
      this.title = this.text;
    }
  }
  focus() {
    this.focusElement.nativeElement.focus();
  }
  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }
}
