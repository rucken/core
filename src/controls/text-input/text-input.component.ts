import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent implements OnInit {
  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public focused: boolean = false;
  @Input()
  public type: string = 'text';
  @Input()
  public readonly: boolean = false;
  @Input()
  public name: string = 'text';
  @Input()
  public placeholder: string = '';
  @Input()
  public title: string = '';
  @Input()
  public model: string = '';
  @Input()
  public hardValue: string = null;
  @Output()
  public modelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public maxlength: number = 250;
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
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
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
