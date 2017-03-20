import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'radios-input',
  templateUrl: './radios-input.component.html',
  styleUrls: ['./radios-input.component.scss']
})

export class RadiosInputComponent implements OnInit {
  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public focused: boolean = false;
  @Input()
  public readonly: boolean = false;
  @Input()
  public name: string = 'radios';
  @Input()
  public title: string = '';
  @Input()
  public values: { [key: string]: string; } = {};
  @Input()
  public model: string;
  @Input()
  public radiosTitles: { [key: string]: string; } = {};
  @Output()
  public modelChange: EventEmitter<string> = new EventEmitter<string>();

  public value: string;
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
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
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
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
