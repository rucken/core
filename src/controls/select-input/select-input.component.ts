import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})

export class SelectInputComponent implements OnInit {
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
  @Output()
  public modelChange: EventEmitter<any> = new EventEmitter<any>();

  public value: any;
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  private initedHardValue: any = null;

  constructor(
    public sanitizer: DomSanitizer
  ) {
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
    if (this.items && this.hardValue !== null) {
      if (this.items.filter(item => this.getValue(item) === this.getValue(this.hardValue)).length === 0) {
        this.initedHardValue = _.cloneDeep(this.hardValue);
        this.items.push(this.hardValue);
      } else {
        this.hardValue = null;
      }
    }
    if (this.model) {
      this.value = this.getValue(this.model);
    } else {
      if (this.items && this.items.length > 0) {
        this.value = this.getValue(this.items[0]);
        this.updateModel();
      } else {
        this.value = this.getValue(null);
      }
    }
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  focus() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
  getValue(item: any) {
    if (item !== null && item[this.valueField]) {
      return item[this.valueField];
    } else {
      return null;
    }
  }
  getTitle(item: any) {
    if (item !== null && item[this.titleField]) {
      return this.safeHtml(item[this.titleField]);
    } else {
      return null;
    }
  }
  updateModel() {
    setTimeout((out: any) => {
      let items = this.items.filter(item => this.getValue(item) === this.value);
      if (this.items && items.length > 0) {
        this.model = items[0];
      } else {
        this.model = null;
      }
      this.modelChange.emit(this.model);
    }, 700);
  }
}
