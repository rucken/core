import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BindObservable } from 'bind-observable';
import { BindIoInner } from 'ngx-bind-io';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@BindIoInner()
@Component({
  selector: 'entity-select',
  templateUrl: './entity-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitySelectComponent implements AfterViewInit, OnChanges {
  @Input()
  searchField: FormControl = new FormControl();
  @Input()
  readonly: boolean = undefined;
  @Output()
  search = new EventEmitter<string>();
  @BindObservable()
  parent: any = undefined;
  parent$: Observable<any>;
  constructor(private _viewContainerRef: ViewContainerRef) {}
  onSearch(text: string) {
    if (isDevMode() && this.search.observers.length === 0) {
      console.warn('No subscribers found for "search"', this.parent);
    }
    this.search.emit(text);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.calcParent();
  }
  calcParent(): any {
    if (this._viewContainerRef) {
      this.parent = this._viewContainerRef['_view'].component;
    }
  }
  ngAfterViewInit() {
    if (!this.searchField.value) {
      this.searchField.setValue('');
    }
    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => this.onSearch(value));
  }
}
