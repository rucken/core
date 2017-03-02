import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})

export class AlertModalComponent implements OnInit {

  @ViewChild('focusElement')
  focusElement: ElementRef;
  @ViewChild('modal')
  modal: ModalDirective;
  @Input()
  text: string = '';
  @Input()
  messageClass: string = 'text-danger';
  @Input()
  buttonClass: string = 'btn-default';
  @Input()
  buttonText: string;
  @Input()
  hideOnClose?: boolean = true;
  @Input()
  size?: string = 'sm';
  @Input()
  title?: string = '';
  @Input()
  hideButton?: boolean = false;
  @Input()
  message: string = '';
  @Output()
  onClose: EventEmitter<AlertModalComponent | any> = new EventEmitter();

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
    this.init();
  }
  init() {
    if (this.message.length > 100) {
      this.size = 'md';
    }
    if (this.message.length > 1000) {
      this.size = 'lg';
    }
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
