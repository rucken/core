import { EventEmitter, Input, isDevMode, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { IModel } from 'ngx-repository';
import { Observable } from 'rxjs';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { translate } from '../utils/translate';
import { IBaseEntityListModal } from './base-entity-list-modal.interface';
import { IBaseEntityList } from './base-entity-list.interface';
import { IBaseEntityModalOptions } from './base-entity-modals.interface';

export class BaseEntityListModalComponent<TModel extends IModel> implements IBaseEntityListModal<TModel>, OnChanges {
  @Input()
  modalItem: IBaseEntityModalOptions = {};
  @Input()
  modalDelete: IBaseEntityModalOptions = {};
  @Input()
  modalCreate: IBaseEntityModalOptions = {};
  @Input()
  modalUpdate: IBaseEntityModalOptions = {};
  @Input()
  modalView: IBaseEntityModalOptions = {};
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {};
  @BindObservable()
  @Input()
  processing = false;
  processing$: Observable<boolean>;
  @Input()
  title: string = undefined;
  @Input()
  message: string = undefined;
  @Input()
  infoMessage: string = undefined;
  @Input()
  errorMessage: string = undefined;
  @Input()
  noTitle = translate('Cancel');
  @Input()
  yesTitle = translate('OK');
  @Output()
  no = new EventEmitter<any>();
  @Output()
  yes = new EventEmitter<any>();

  @BindObservable()
  @Input()
  yesClass: string = undefined;
  yesClass$: Observable<string>;
  @BindObservable()
  @Input()
  noClass: string = undefined;
  noClass$: Observable<string>;

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
  mockedItems: TModel[] = undefined;
  @Output()
  mockedItemsChange: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();

  yesData: any;
  noData: any;

  modalRef: IModalRef<BaseEntityListModalComponent<TModel>>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.mockedItems) {
      this.setMockedItems(changes.mockedItems.currentValue);
    }
  }
  setMockedItems(items: TModel[]) {
    this.mockedItems = items;
    this.grid.mockedItems = this.mockedItems;
  }
  onNoClick(data?: any): void {
    this.noData = data;
    this.no.emit(this);
    if (this.hideOnNo && this.modalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.no.observers.length === 0) {
        console.warn('No subscribers found for "no"', this);
      }
    }
  }
  onYesClick(data?: any): void {
    this.yesData = data;
    this.mockedItems = this.grid.mockedItems;
    this.mockedItemsChange.emit(this.mockedItems);
    this.yes.emit(this);
    if (this.hideOnYes && this.modalRef) {
      this.hide();
    } else {
      if (isDevMode() && this.yes.observers.length === 0) {
        console.warn('No subscribers found for "yes"', this);
      }
    }
  }
  hide() {
    this.modalRef.hide();
  }
}
