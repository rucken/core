import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'radios-input',
  templateUrl: './radios-input.component.html',
  styleUrls: ['./radios-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
  values: { [key: string]: any; } = {};
  @Input()
  set model(value: any) {
    this._model = value;
    this.modelChange.emit(this.model);
  }
  get model() {
    return this._model;
  }
  @Input()
  radiosTitles: { [key: string]: string; } = {};
  @Output()
  modelChange: EventEmitter<string> = new EventEmitter<string>();

  private _model: any;
  init() {
    if (this._model === undefined) {
      this.value = this.values[this.keys(this.values)[0]];
    }
    super.init();
  }
}
