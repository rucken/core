import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EndpointStatusEnum } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'base-modal-component',
  template: ''
})
export class BaseModalComponent extends BaseComponent {

  @Input()
  focused = true;
  @Input()
  class = '';
  @Input()
  hideOnClose?= true;
  @Input()
  hideButton?= false;
  @Input()
  size?: string;
  @Input()
  title?: string;
  @Input()
  message?: string;
  @Input()
  okInProcess = false;
  @Output()
  onClose: EventEmitter<any> = new EventEmitter();
  @Output()
  onOk: EventEmitter<any> = new EventEmitter();

  currentLocation = '';

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
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
      if (this.focused) {
        this.focus();
      }
      this.afterOpen();
    });
    if (this.title === undefined) {
      this.title = '';
    }
    if (this.message === undefined) {
      this.message = '';
    }
    if (this.message.length > 100) {
      this.size = 'md';
    }
    if (this.message.length > 1000) {
      this.size = 'lg';
    }
    if (!this.size) {
      this.size = 'sm';
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
  ok() {
    this.onOk.emit(this);
    return false;
  }
  okInProcessFromStatus(status: EndpointStatusEnum) {
    this.okInProcess =
      status === EndpointStatusEnum.Creating ||
      status === EndpointStatusEnum.Updating ||
      status === EndpointStatusEnum.Removing ||
      status === EndpointStatusEnum.Processing ||
      status === EndpointStatusEnum.Loading;
  }
}
