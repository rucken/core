import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
  isDevMode,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'entity-input',
  templateUrl: './entity-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInputComponent {
  @Input()
  readonly: boolean;
  @Output()
  select = new EventEmitter<boolean>();
  get parent(): any {
    return this._viewContainerRef['_view'].component;
  }
  constructor(private _viewContainerRef: ViewContainerRef) {}
  onSelectClick() {
    if (isDevMode() && this.select.observers.length === 0) {
      console.warn('No subscribers found for "select"', this.parent);
    }
    this.select.emit(true);
  }
}
