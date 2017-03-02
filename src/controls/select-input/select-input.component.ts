import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})

export class SelectInputComponent implements OnInit {
  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  inFormGroup: boolean = true;
  @Input()
  focused: boolean = false;
  @Input()
  items: any[] = [];
  @Input()
  readonly: boolean = false;
  @Input()
  name: string = 'select';
  @Input()
  placeholder: string = '';
  @Input()
  valueField: string = 'id';
  @Input()
  title: string;
  @Input()
  model: any;
  @Input()
  titleField: string = 'title';
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter<any>();

  public value: any;
  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  private errorsValue: any;
  private infoValue: any;
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
    this.inputElement.nativeElement.focus();
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
      return item[this.titleField];
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
