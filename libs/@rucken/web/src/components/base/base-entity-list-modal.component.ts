import { EventEmitter, Input, Output, ViewChild, isDevMode } from '@angular/core';
import { translate } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IModel } from 'ngx-repository';
import { IBaseEntityList } from './base-entity-list.interface';

export class BaseEntityListModalComponent<TModel extends IModel> {

  @Input()
  processing: boolean;
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();
  @Input()
  yesClass = 'btn btn-primary';
  @Input()
  hideNo = false;
  @Input()
  hideYes = false;
  @Input()
  readonly = false;

  @Input()
  hideOnNo = true;
  @Input()
  hideOnYes = false;

  @ViewChild('grid')
  grid: IBaseEntityList<TModel>;

  @Input()
  set mockedItems(items: TModel[]) {
    this._mockedItems = items;
    this.grid.mockedItems = this.mockedItems;
  }
  get mockedItems() {
    return this._mockedItems;
  }
  @Output()
  mockedItemsChange: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();

  private _mockedItems: TModel[];

  constructor(
    protected bsModalRef: BsModalRef
  ) {
  }
  onNoClick(): void {
    this.no.emit(this);
    if (this.hideOnNo) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  onYesClick(): void {
    this.mockedItems = this.grid.mockedItems;
    this.mockedItemsChange.emit(this.mockedItems);
    this.yes.emit(this);
    if (this.hideOnYes) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  hide() {
    this.bsModalRef.hide();
  }
}
