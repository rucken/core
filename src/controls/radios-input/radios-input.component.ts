import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'radios-input',
  templateUrl: './radios-input.component.html',
  styleUrls: ['./radios-input.component.scss']
})

export class RadiosInputComponent implements OnInit {
  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  focused: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  name: string = 'radios';
  @Input()
  title: string = '';
  @Input()
  values: { [key: string]: string; } = {};
  @Input()
  model: string;
  @Input()
  radiosTitles: { [key: string]: string; } = {};
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();

  public value: string;
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
      this.value = this.model;
    } else {
      this.value = this.values[this.keys(this.values)[0]];
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
  keys(object: {}) {
    return Object.keys(object);
  }
  updateModel() {
    setTimeout((out: any) => {
      this.model = this.value;
      this.modelChange.emit(this.model);
    }, 700);
  }
}
