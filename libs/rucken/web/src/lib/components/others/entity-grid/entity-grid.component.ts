import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
  isDevMode
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { translate } from '@rucken/core';
import { IModel, PaginationMeta } from 'ngx-repository';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'entity-grid',
  templateUrl: './entity-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityGridComponent<TModel extends IModel> {
  @ContentChild('#defaultGridFieldContent')
  defaultGridFieldContent: TemplateRef<any>;
  @ContentChild('#defaultGridFieldActionContent')
  defaultGridFieldActionContent: TemplateRef<any>;
  @ContentChild('#defaultGridCellContent')
  defaultGridCellContent: TemplateRef<any>;
  @ContentChild('#defaultGridCellTranslatedContent')
  defaultGridCellTranslatedContent: TemplateRef<any>;
  @ContentChild('#defaultGridCellActionContent')
  defaultGridCellActionContent: TemplateRef<any>;
  @ContentChild('#defaultSearchFieldTemplate')
  defaultSearchFieldTemplate: TemplateRef<any>;
  @ContentChild('#defaultEntityGridFooterTemplate')
  defaultEntityGridFooterTemplate: TemplateRef<any>;
  @ContentChild('#defaultEntityGridHeaderTemplate')
  defaultEntityGridHeaderTemplate: TemplateRef<any>;

  @Input()
  gridFieldTemplate: TemplateRef<any>;
  @Input()
  gridCellTemplate: TemplateRef<any>;
  @Input()
  gridFieldContent: TemplateRef<any>;
  @Input()
  gridFieldActionContent: TemplateRef<any>;
  @Input()
  gridCellContent: TemplateRef<any>;
  @Input()
  gridCellTranslatedContent: TemplateRef<any>;
  @Input()
  gridCellActionContent: TemplateRef<any>;
  @Input()
  searchFieldTemplate: TemplateRef<any>;
  @Input()
  entityGridFooterTemplate: TemplateRef<any>;
  @Input()
  entityGridHeaderTemplate: TemplateRef<any>;

  @Input()
  selectFirst?: boolean;
  @Input()
  processing: boolean;
  @Input()
  searchField: FormControl = new FormControl();
  @Input()
  title: string;
  @Input()
  createTitle = translate('Create');
  @Input()
  createClass = 'btn btn-primary';
  @Input()
  translatedCells: string[] = [];
  @Input()
  orderColumns: string[];
  @Input()
  columnsClasses: { [key: string]: string };
  @Input()
  orderBy: string;
  @Input()
  multiSelectColumns: string[];
  @Input()
  set columns(columns: string[]) {
    this._columns = columns;
  }
  get columns() {
    if (this._columns) {
      return this._columns.filter(
        column =>
          column === 'action'
            ? this.readonly === true ||
              (!this.isEnableDelete && !this.isEnableUpdate)
              ? false
              : true
            : true
      );
    } else {
      return this._columns;
    }
  }
  @Input()
  classes: string[];
  @Input()
  strings: any;
  @Input()
  set items(items: TModel[]) {
    this._items = items;
    if (
      this.selectFirst !== false &&
      items &&
      items.length &&
      items.filter(
        item =>
          this._selected &&
          this._selected.length &&
          this._selected[0].id === item.id
      ).length === 0
    ) {
      this.onSelected([]);
    }
  }
  get items() {
    return this._items;
  }
  @Output()
  delete: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  view: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  update: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  dblClick: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  changeOrder: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  appendFromGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  selected: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Output()
  changePage: EventEmitter<{
    page: number;
    itemsPerPage: number;
  }> = new EventEmitter<{ page: number; itemsPerPage: number }>();
  @Input()
  readonly: boolean;
  @Input()
  enableCreate = true;
  @Input()
  enableUpdate = true;
  @Input()
  enableDelete = true;
  @Input()
  enableAppendFromGrid = true;
  @Input()
  paginationMeta: PaginationMeta;

  get enableOnlyUpdateOrDelete() {
    return (
      (this.isEnableDelete && !this.isEnableUpdate) ||
      (!this.isEnableDelete && this.isEnableUpdate)
    );
  }
  get enableUpdateAndDelete() {
    return this.isEnableDelete && this.isEnableUpdate;
  }
  get isAppendFromGridMode() {
    return this.appendFromGrid.observers.length > 0;
  }

  private _selected: TModel[];
  private _items: TModel[];
  private _columns: string[];

  constructor(private _viewContainerRef: ViewContainerRef) {
    this.searchField.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => this.onSearch(value));
  }
  get isEnableAppendFromGrid() {
    return !this.readonly && this.enableAppendFromGrid;
  }
  get isEnableCreate() {
    return !this.readonly && this.enableCreate;
  }
  get isEnableDelete() {
    return !this.readonly && this.enableDelete;
  }
  get isEnableUpdate() {
    return !this.readonly && this.enableUpdate;
  }
  get parent(): any {
    return this._viewContainerRef['_view'].component;
  }
  onChangeOrder(column: string) {
    if (this.orderBy === `${column}`) {
      this.orderBy = `-${column}`;
    } else {
      this.orderBy = `${column}`;
    }
    this.changeOrder.emit(this.orderBy);
  }
  onChangePage(meta: { page: number; itemsPerPage: number }) {
    if (isDevMode() && this.changePage.observers.length === 0) {
      console.warn('No subscribers found for "onChangePage"', this.parent);
    }
    this.changePage.emit(meta);
  }
  onSearch(text: string) {
    if (isDevMode() && this.search.observers.length === 0) {
      console.warn('No subscribers found for "search"', this.parent);
    }
    this.search.emit(text);
  }
  onDelete(item: TModel) {
    if (isDevMode() && !this.isEnableDelete) {
      console.warn('Delete action is disabled', this.parent);
    }
    if (isDevMode() && this.delete.observers.length === 0) {
      console.warn('No subscribers found for "delete"', this.parent);
    }
    this.delete.emit(item);
  }
  onUpdate(item: TModel) {
    if (isDevMode() && !this.isEnableUpdate) {
      console.warn('Update action is disabled', this.parent);
    }
    if (isDevMode() && this.update.observers.length === 0) {
      console.warn('No subscribers found for "update"', this.parent);
    }
    this.update.emit(item);
  }
  onCreate() {
    if (isDevMode() && !this.isEnableCreate) {
      console.warn('Create action is disabled', this.parent);
    }
    if (isDevMode() && this.create.observers.length === 0) {
      console.warn('No subscribers found for "create"', this.parent);
    }
    this.create.emit();
  }
  onView(item: TModel) {
    if (isDevMode() && this.view.observers.length === 0) {
      console.warn('No subscribers found for "view"', this.parent);
    }
    this.view.emit(item);
  }
  onDblClick(item: TModel) {
    if (this.dblClick.observers.length > 0) {
      this.dblClick.emit(item);
    } else {
      if (isDevMode() && this.dblClick.observers.length === 0) {
        console.warn('No subscribers found for "dblClick"', this.parent);
      }
      if (this.readonly === true || !this.isEnableUpdate) {
        if (isDevMode() && this.dblClick.observers.length === 0) {
          console.warn('Try call "view" for "dblClick"', this.parent);
        }
        this.onView(item);
      } else {
        if (isDevMode() && this.dblClick.observers.length === 0) {
          console.warn('Try call "update" for "dblClick"', this.parent);
        }
        this.onUpdate(item);
      }
    }
  }
  onAppendFromGrid() {
    if (isDevMode() && !this.isEnableAppendFromGrid) {
      console.warn('Append from grid action is disabled', this.parent);
    }
    if (isDevMode() && this.appendFromGrid.observers.length === 0) {
      console.warn('No subscribers found for "appendFromGrid"', this.parent);
    }
    this.appendFromGrid.emit(true);
  }
  clearSelected() {
    this._selected = [];
  }
  onSelected(items: TModel[]) {
    if (
      this.selectFirst !== false &&
      items &&
      items.length === 0 &&
      this._items &&
      this._items.length
    ) {
      items = [this._items[0]];
    }
    this._selected = items;
    this.selected.emit(items);
  }
  trackByFn(index, item) {
    return item.id;
  }
  isSelected(item: TModel) {
    const index = this._selected.findIndex(
      eachItem => eachItem && item && eachItem.id === item.id
    );
    return index !== -1;
  }
  toggle(item: TModel, col: string) {
    if (
      !this.multiSelectColumns ||
      this.multiSelectColumns.indexOf(col) === -1
    ) {
      this._selected = [];
    }
    const selected = this._selected ? this._selected : [];
    const index = selected.findIndex(
      eachItem => eachItem && item && eachItem.id === item.id
    );
    if (index === -1) {
      selected.push(item);
    } else {
      selected.splice(index, 1);
    }
    this.onSelected(selected);
  }
  isAllSelected() {
    const numSelected = this._selected ? this._selected.length : -1;
    const numRows = this.items ? this.items.length : 0;
    return numSelected === numRows;
  }
  masterToggle() {
    let selected = this._selected;
    if (this.isAllSelected()) {
      selected = [];
    } else {
      selected = [...this.items];
    }
    this.onSelected(selected);
  }
}
