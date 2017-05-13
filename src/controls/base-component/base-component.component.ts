import { OnInit, Input, EventEmitter } from '@angular/core';

export class BaseComponent implements OnInit {
  @Input()
  public name = '';
  @Input()
  public focused = false;
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  [key: string]: any;
  ngOnInit() {
    this.beforeInit();
    this.init();
    this.afterInit();
  }
  beforeInit() { }
  afterInit() { }
  init() {
    this.errors.subscribe((data: any) => {
      this.errorsValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    this.info.subscribe((data: any) => {
      this.infoValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 300);
  }
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
  safeHtml(html: string): any {
    if (this.sanitizer) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } else {
      return html;
    }
  }
  translate(text: string) {
    if (this.translateService) {
      return this.translateService.instant(text);
    } else {
      return text;
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
      if (inputElement.nativeElement) {
        inputElement = inputElement.nativeElement
      } else {
        if (inputElement.inputElement) {
          inputElement = inputElement.inputElement
        } else {
          break;
        }
      }
    }
  }
}
