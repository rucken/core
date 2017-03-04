import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'checkboxes-input',
  templateUrl: './checkboxes-input.component.html',
  styleUrls: ['./checkboxes-input.component.scss']
})

export class CheckboxesInputComponent implements OnInit {
  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  focused: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  name: string = 'checkboxes';
  @Input()
  title: string = '';
  @Input()
  models: { [key: string]: boolean; } = {};
  @Input()
  checkboxesTitles: { [key: string]: string; } = {};
  @Output()
  modelsChange: EventEmitter<{ [key: string]: boolean; }> = new EventEmitter<{ [key: string]: boolean; }>();

  public values: { [key: string]: boolean; } = {};
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
    this.init();
  }
  init() {
    this.values = this.models;
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  focus() {
    this.inputElement.nativeElement.focus();
  }
  updateModels() {
    setTimeout((out: any) => {
      this.models = this.values;
      this.modelsChange.emit(this.models);
    }, 700);
  }
  keys(object: {}) {
    return Object.keys(object);
  }
}
