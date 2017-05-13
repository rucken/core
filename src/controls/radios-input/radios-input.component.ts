import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'radios-input',
  templateUrl: './radios-input.component.html',
  styleUrls: ['./radios-input.component.scss']
})

export class RadiosInputComponent extends BaseComponent {
  @Input()
  labelClass? = 'control-label';
  @Input()
  inputClass? = 'control-label checkbox-inline';
  @Input()
  inputFrameClass? = 'form-control form-radio-controls';

  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public readonly = false;
  @Input()
  public name = 'radios';
  @Input()
  public title = '';
  @Input()
  public values: { [key: string]: string; } = {};
  @Input()
  public model: string;
  @Input()
  public radiosTitles: { [key: string]: string; } = {};
  @Output()
  public modelChange: EventEmitter<string> = new EventEmitter<string>();

  public value: string;
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
