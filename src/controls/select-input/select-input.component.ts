import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Ng2AutoCompleteComponent } from 'ng2-auto-complete';
import * as _ from 'lodash';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class SelectInputComponent implements OnInit {
  @Input()
  public width: string = null;
  @ViewChild('autoComplete')
  public autoComplete: Ng2AutoCompleteComponent;
  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public inFormGroup: boolean = true;
  @Input()
  public focused: boolean = false;
  @Input()
  public items: any[] = [];
  @Input()
  public readonly: boolean = false;
  @Input()
  public name: string = 'select';
  @Input()
  public placeholder: string = '';
  @Input()
  public valueField: string = 'id';
  @Input()
  public title: string;
  @Input()
  public model: any;
  @Input()
  public hardValue: any = null;
  @Input()
  public titleField: string = 'title';
  @Input()
  public inputTitleField: string = 'title';
  @Output()
  public modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  private _showMe: boolean = false;

  public getTitle: any;
  constructor(
    public sanitizer: DomSanitizer
  ) {
  }
  get showMe() {
    return this._showMe;
  }
  set showMe(val: any) {
    this.resizeList();
    this._showMe = val;
  }
  get value() {
    return this.model;
  }
  set value(val: any) {
    this.model = val;
    this.modelChange.emit(this.model);
  }
  safeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit() {
    this.errors.subscribe((data: any) => {
      this.errorsValue = data;
      let keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    this.info.subscribe((data: any) => {
      this.infoValue = data;
      let keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    this.init();
  }
  init() {
    this.getTitle = (item: any) => {
      if (item && item[this.titleField]) {
        return this.safeHtml(item[this.titleField]);
      }
      return '';
    };
    if (this.hardValue) {
      this.value = this.hardValue;
    }
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  resizeList() {
    if (this.autoComplete && this.autoComplete.el &&
      this.autoComplete.el.children[0] && this.autoComplete.el.children[0].children[0] &&
      this.inputElement && this.inputElement.nativeElement) {
      let options: any = this.autoComplete.el.children[0].children[0].children;
      let select: any = this.autoComplete.el.children[0];
      if (options.length === this.items.length) {
        for (let i = 0; i < options.length; i++) {
          if (this.width === null) {
            options[i].style.width = this.inputElement.nativeElement.offsetWidth + 'px';
          } else {
            options[i].style.width = this.width;
          }
        }
        select.style.display = '';
      }
    }
  }
  focus() {
    this.showMe = true;
  }
  getInputTitle(item: any) {
    if (item && item[this.inputTitleField]) {
      return item[this.inputTitleField];
    }
    if (item && item[this.titleField]) {
      return item[this.titleField];
    }
    return '';
  }
}
