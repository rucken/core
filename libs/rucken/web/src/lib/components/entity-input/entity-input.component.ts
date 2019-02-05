import { ChangeDetectionStrategy, Component, EventEmitter, Input, isDevMode, OnChanges, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { BindIoInner } from 'ngx-bind-io';
import { Observable } from 'rxjs';

@BindIoInner()
@Component({
  selector: 'entity-input',
  templateUrl: './entity-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInputComponent implements OnChanges {
  @Input()
  readonly: boolean = undefined;
  @Output()
  select = new EventEmitter<boolean>();
  selectData: any;
  @BindObservable()
  parent: any = undefined;
  parent$: Observable<any>;
  constructor(private _viewContainerRef: ViewContainerRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.calcParent();
  }
  calcParent(): any {
    if (this._viewContainerRef) {
      this.parent = this._viewContainerRef['_view'].component;
    }
  }
  onSelectClick(data?: any) {
    this.selectData = data;
    if (isDevMode() && this.select.observers.length === 0) {
      console.warn('No subscribers found for "select"', this.parent);
    }
    this.select.emit(true);
  }
}
