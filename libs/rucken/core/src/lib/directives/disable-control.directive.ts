import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective implements OnChanges {
  @Input()
  disableControl: boolean = undefined;
  constructor(private _ngControl: NgControl) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disableControl) {
      const action = this.disableControl ? 'disable' : 'enable';
      this._ngControl.control[action]();
    }
  }
}
