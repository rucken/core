import { HostListener, Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from '../../base/base-component/base-component.component';
import * as _ from 'lodash';

export class BaseModalComponent extends BaseComponent {

  @Input()
  class = '';
  @Input()
  hideOnClose?= true;
  @Input()
  hideButton?= false;
  @Input()
  size?= 'sm';
  @Input()
  title?= '';
  @Input()
  message = '';
  @Output()
  onClose: EventEmitter<any> = new EventEmitter();
  currentLocation = '';
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.modal.hide();
  }
  init() {
    super.init();
    this.modal.onHidden.subscribe(() => {
      this.close();
      this.afterClose();
    });
    this.modal.onShown.subscribe(() => {
      // todo: fix history.pushState(null, null, this.currentLocation + '/' + _.kebabCase(this.name));
      this.focus();
      this.afterOpen();
    });
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
  afterClose() {

  }
  afterOpen() {

  }
  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
      // todo: fix history.back();
    }
    this.onClose.emit(this);
    return false;
  }
}
