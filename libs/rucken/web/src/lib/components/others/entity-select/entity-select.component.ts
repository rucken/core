import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
  isDevMode
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'entity-select',
  templateUrl: './entity-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitySelectComponent implements AfterViewInit {
  @Input()
  searchField: FormControl = new FormControl();
  @Input()
  readonly: boolean;
  @Output()
  search = new EventEmitter<string>();
  get parent(): any {
    return this._viewContainerRef['_view'].component;
  }
  constructor(private _viewContainerRef: ViewContainerRef) {}
  onSearch(text: string) {
    if (isDevMode() && this.search.observers.length === 0) {
      console.warn('No subscribers found for "search"', this.parent);
    }
    this.search.emit(text);
  }
  ngAfterViewInit() {
    if (!this.searchField.value) {
      this.searchField.setValue('');
    }
    this.searchField.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => this.onSearch(value));
  }
}
