import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'checkboxes-input',
  templateUrl: './checkboxes-input.component.html',
  styleUrls: ['./checkboxes-input.component.scss']
})

export class CheckboxesInputComponent extends BaseComponent {
  @Input()
  labelClass?= 'control-label';
  @Input()
  inputClass?= 'control-label checkbox-inline';
  @Input()
  inputFrameClass?= 'form-control form-checkbox-controls';

  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public readonly = false;
  @Input()
  public name = 'checkboxes';
  @Input()
  public title = '';
  @Input()
  public models: { [key: string]: boolean; } = {};
  @Input()
  public checkboxesTitles: { [key: string]: string; } = {};
  @Output()
  public modelsChange: EventEmitter<{ [key: string]: boolean; }> = new EventEmitter<{ [key: string]: boolean; }>();

  public values: { [key: string]: boolean; } = {};

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
