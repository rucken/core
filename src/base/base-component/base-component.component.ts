import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'base-component',
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {

  @Input()
  tooltipEnable: boolean;
  @Input()
  tooltipText = '';
  @Input()
  tooltipPlacement = 'bottom';
  @Input()
  tooltipTriggers = 'hover focus';
  @Input()
  name?: string;
  @Input()
  focused = false;
  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();

  errorsValue: any;
  infoValue: any;
  [key: string]: any;

  destroyed$: Subject<boolean> = new Subject();

  get errorMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.errorsValue && this.errorsValue[this.name]) {
      for (let i = 0; i < this.errorsValue[this.name].length; i++) {
        if (this.errorsValue[this.name][i]) {
          text = this.translate(this.errorsValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  get infoMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.infoValue && this.infoValue[this.name]) {
      for (let i = 0; i < this.infoValue[this.name].length; i++) {
        if (this.infoValue[this.name][i]) {
          text = this.translate(this.infoValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  ngOnInit() {
    if (this.app && this.app.translateService && this.translateService) {
      this.translateService.store = this.app.translateService.store;
    }
    this.afterCreate();
    this.init();
  }
  afterCreate() { }
  init() {
    if (this.errors) {
      this.errors.subscribe((data: any) => {
        this.errorsValue = data;
        const keys = Object.keys(data);
        if (keys[0] === this.name) {
          this.focus();
        }
        this.tooltipText = this.errorMessage;
      });
    }
    if (this.info) {
      this.info.subscribe((data: any) => {
        this.infoValue = data;
        const keys = Object.keys(data);
        if (keys[0] === this.name) {
          this.focus();
        }
        this.tooltipText = this.infoMessage;
      });
    }
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 300);
  }
  translate(text: string) {
    if (this.translateService) {
      return this.translateService.instant(text);
    } else {
      return text;
    }
  }
  safeHtml(html: string) {
    if (this.sanitizer) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } else {
      return html;
    }
  }
  keys(object: {}) {
    return Object.keys(object);
  }
  focus() {
    let inputElement: any = this.inputElement;
    if (!inputElement) {
      inputElement = this.focusElement;
    }
    while (inputElement) {
      if (inputElement.focus) {
        inputElement.focus();
        break;
      }
      if (inputElement && inputElement.nativeElement) {
        inputElement = inputElement.nativeElement
      } else {
        if (inputElement && inputElement.inputElement) {
          inputElement = inputElement.inputElement
        } else {
          break;
        }
      }
    }
  }
  showTooltip() {
    const tooltip: any = this.tooltip;
    if (!tooltip._tooltip || !tooltip._tooltip._componentRef || !tooltip._tooltip._componentRef.location.nativeElement) {
      return;
    }
    const tooltipInner: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-inner')[0];
    const tooltipArrow: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-arrow')[0];
    if (this.inputElement.inputElement) {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
    } else {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
    }
  }
}
