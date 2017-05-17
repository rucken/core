import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'radios-input',
  templateUrl: './radios-input.component.html',
  styleUrls: ['./radios-input.component.scss']
})

export class RadiosInputComponent extends BaseComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'control-label checkbox-inline';
  @Input()
  inputFrameClass?= 'form-control form-radio-controls';
  @Input()
  readonly = false;
  @Input()
  name = 'radios';
  @Input()
  title = '';
  @Input()
  values: { [key: string]: string; } = {};
  @Input()
  model: string;
  @Input()
  radiosTitles: { [key: string]: string; } = {};
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();

  value: string;

  init() {
    if (this.model) {
      this.value = this.model;
    } else {
      this.value = this.values[this.keys(this.values)[0]];
    }
    super.init();
  }
  updateModel() {
    setTimeout((out: any) => {
      this.model = this.value;
      this.modelChange.emit(this.model);
    }, 700);
  }
}
