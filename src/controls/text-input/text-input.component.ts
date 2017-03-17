import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent implements OnInit {
  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  focused: boolean = false;
  @Input()
  type: string = 'text';
  @Input()
  readonly: boolean = false;
  @Input()
  name: string = 'text';
  @Input()
  placeholder: string = '';
  @Input()
  title: string = '';
  @Input()
  model: string = '';
  @Input()
  hardValue: string = null;
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
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
  }
  init() {
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  focus() {
    this.inputElement.nativeElement.focus();
  }
  get value() {
    if (this.hardValue !== null) {
      return this.hardValue;
    }
    return this.model;
  }
  set value(val) {
    this.model = val;
    this.modelChange.emit(this.model);
  }
}
