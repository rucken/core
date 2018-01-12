import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { BaseComponent } from './../../base/base-component/base-component.component';


@Component({
  selector: 'checkboxes-input',
  templateUrl: './checkboxes-input.component.html',
  styleUrls: ['./checkboxes-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckboxesInputComponent extends BaseComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  labelClass = 'control-label';
  @Input()
  inputClass = 'control-label checkbox-inline';
  @Input()
  inputFrameClass = 'form-control form-checkbox-controls';
  @Input()
  readonly = false;
  @Input()
  name = 'checkboxes';
  @Input()
  title = '';
  @Input()
  models: { [key: string]: boolean; } = {};
  @Input()
  checkboxesTitles: { [key: string]: string; } = {};
  @Output()
  modelsChange: EventEmitter<{ [key: string]: boolean; }> = new EventEmitter<{ [key: string]: boolean; }>();

  values: { [key: string]: boolean; } = {};

  init() {
    this.values = this.models;
    super.init();
  }
  updateModels() {
    setTimeout((out: any) => {
      this.models = this.values;
      this.modelsChange.emit(this.models);
    }, 700);
  }
}
