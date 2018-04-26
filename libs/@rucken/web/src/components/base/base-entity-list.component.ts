import { EventEmitter, Input, Output, isDevMode } from '@angular/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IFactoryModel, IModel, Repository } from 'ngx-repository';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { first } from 'rxjs/operators';
import { IBaseEntityListModal } from '../base/base-entity-list-modal.interface';
import { MessageModalService } from '../modals/message-modal/message-modal.service';
import { IEntityGridFilter } from '../others/entity-grid/entity-grid-filter.interface';
import { EntityModalComponent } from '../others/entity-modal/entity-modal.component';
import { IBaseEntityList } from './base-entity-list.interface';

export class BaseEntityListComponent<TModel extends IModel> implements IBaseEntityList<TModel> {

  @Input()
  processing: boolean;
  @Input()
  apiUrl?: string;
  @Input()
  set mockedItems(items: TModel[]) {
    this._mockedItems = items;
  }
  get mockedItems() {
    return this._mockedItems;
  }
  @Output()
  mockedItemsChange: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  strings: any;
  @Output()
  selected: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  readonly: boolean;
  @Input()
  title: string;
  @Input()
  filter: IEntityGridFilter = { searchText: '', sort: '-id' };

  private _mockedItems: TModel[];
  private _selected: TModel[] = [];

  constructor(
    public repository: Repository<TModel>,
    public modalService: BsModalService,
    public factoryModel: IFactoryModel<TModel>,
    protected errorsExtractor?: ErrorsExtractor,
    protected messageModalService?: MessageModalService
  ) {
    if (factoryModel.strings) {
      this.strings = factoryModel.strings;
    } else {
      this.strings = Object.keys(new factoryModel()).reduce((acc, cur, i) => {
        acc[cur] = cur;
        return acc;
      }, {});
    }
  }
  getSelected() {
    return this._selected;
  }
  onSelected(selected: TModel[]) {
    this._selected = selected;
    this.selected.emit(this._selected);
  }
  onChangePage(meta: { page: number, itemsPerPage: number }) {
    this.repository.setOptions({
      paginationMeta: { curPage: meta.page, perPage: meta.itemsPerPage }
    });
  }
  onChangeFilter(filter: IEntityGridFilter) {
    this.processing = true;
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        if (key === 'searchText') {
          this.filter.searchText = typeof filter.searchText === 'string' ? filter.searchText : '';
        } else {
          this.filter[key] = filter[key];
        }
      }
    }
    this.repository.loadAll(this.filter).pipe(first()).subscribe(
      items => this.onSuccess(items),
      error => this.onError(error)
    );
  }
  onSuccess(items: TModel[]) {
    this.processing = false;
  }
  onError(error: any) {
    this.processing = false;
    if (isDevMode()) {
      console.warn('Method "onError" is not defined', this);
    }
    if (this.messageModalService) {
      this.messageModalService.error({
        error: error
      }).subscribe();
    } else {
      if (isDevMode()) {
        console.warn('MessageModalService is not injected', this);
      }
    }
  }
  defaultCreateViewModal(item: TModel): BsModalRef {
    const title = (this.strings && this.strings.viewTitle ? this.strings.viewTitle : translate('Item #{{id}}'));
    const bsModalRef = this.modalService.show(EntityModalComponent, {
      class: 'modal-md',
      initialState: {
        title: title,
        noTitle: translate('Close'),
        readonly: true,
        data: item,
        apiUrl: this.apiUrl
      }
    });
    (bsModalRef.content as EntityModalComponent).group(this.factoryModel);
    (bsModalRef.content as EntityModalComponent).data = item;
    return bsModalRef;
  }
  createViewModal(item: TModel): BsModalRef {
    return undefined;
  }
  onViewClick(item: TModel): BsModalRef {
    let bsModalRef = this.createViewModal(item);
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateViewModal(item);
      if (isDevMode()) {
        console.warn('Method "createViewModal" is not defined', this);
      }
    }
    return bsModalRef;
  }
  defaultCreateCreateModal(): BsModalRef {
    const title = this.strings && this.strings.createTitle ? this.strings.createTitle : translate('Create new item');
    const item = new this.factoryModel();
    const bsModalRef = this.modalService.show(EntityModalComponent, {
      class: 'modal-md',
      initialState: {
        title: title,
        yesTitle: translate('Create'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
    (bsModalRef.content as EntityModalComponent).group(this.factoryModel);
    return bsModalRef;
  }
  createCreateModal(): BsModalRef {
    return undefined;
  }
  onCreateError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onCreateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onCreateClick(): void {
    let bsModalRef = this.createCreateModal();
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateCreateModal();
      if (isDevMode()) {
        console.warn('Method "createCreateModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe(
      (modal: any) => {
        modal.processing = true;
        this.repository.create(modal.data).subscribe(
          createdItem => {
            modal.processing = false;
            if (this.mockedItems) {
              this.mockedItems = this.repository.items;
              this.mockedItemsChange.emit(this.mockedItems);
            }
            modal.hide();
          },
          error => this.onCreateError(modal, error)
        );
      });
  }
  defaultCreateUpdateModal(item: TModel): BsModalRef {
    const title = (this.strings && this.strings.updateTitle ? this.strings.updateTitle : translate('Update item #{{id}}'));
    const bsModalRef = this.modalService.show(EntityModalComponent, {
      class: 'modal-md',
      initialState: {
        title: title,
        yesTitle: translate('Save'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
    (bsModalRef.content as EntityModalComponent).group(this.factoryModel);
    (bsModalRef.content as EntityModalComponent).data = item;
    return bsModalRef;
  }
  createUpdateModal(item: TModel): BsModalRef {
    return undefined;
  }
  onUpdateError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onUpdateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onUpdateClick(item: TModel): void {
    let bsModalRef = this.createUpdateModal(item);
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateUpdateModal(item);
      if (isDevMode()) {
        console.warn('Method "createUpdateModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe(
      (modal: any) => {
        modal.processing = true;
        this.repository.update(item.id, modal.data).subscribe(
          updatedItem => {
            modal.processing = false;
            if (this.mockedItems) {
              this.mockedItems = this.repository.items;
              this.mockedItemsChange.emit(this.mockedItems);
            }
            modal.hide();
          },
          error => this.onUpdateError(modal, error)
        );
      });
  }
  defaultCreateDeleteModal(item: TModel): BsModalRef {
    const title =
      (this.strings && this.strings.deleteTitle ? this.strings.deleteTitle : translate('Delete item #{{id}}'));
    const message =
      (this.strings && this.strings.deleteMessage ? this.strings.deleteMessage : translate('Do you really want to delete item?'));
    const bsModalRef = this.modalService.show(EntityModalComponent, {
      class: 'modal-md',
      initialState: {
        title: title,
        message: message,
        yesTitle: translate('Delete'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
    (bsModalRef.content as EntityModalComponent).group(this.factoryModel);
    return bsModalRef;
  }
  createDeleteModal(item: TModel): BsModalRef {
    return undefined;
  }
  onDeleteError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onDeleteError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onDeleteClick(item: TModel): void {
    let bsModalRef = this.createDeleteModal(item);
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateDeleteModal(item);
      if (isDevMode()) {
        console.warn('Method "createDeleteModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe(
      modal => {
        modal.processing = true;
        this.repository.delete(item.id).subscribe(
          deletedItem => {
            modal.processing = false;
            if (this.mockedItems) {
              this.mockedItems = this.repository.items;
              this.mockedItemsChange.emit(this.mockedItems);
            }
            modal.hide();
          },
          error => this.onDeleteError(modal, error)
        );
      });
  }
  createAppendFromGridModal(): BsModalRef {
    return undefined;
  }
  onAppendFromGridError(modal: IBaseEntityListModal<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onAppendFromGridError" is not defined', this);
    }
    if (this.errorsExtractor) {
      this.onError(error);
    }
  }
  onAppendFromGridClick(): void {
    const bsModalRef = this.createAppendFromGridModal();
    if (!bsModalRef) {
      if (isDevMode()) {
        console.warn('Method "createAppendFromGridModal" is not defined', this);
        return;
      }
    }
    bsModalRef.content.yes.subscribe(
      (modal: IBaseEntityListModal<TModel>) => {
        modal.processing = true;
        const observables = [];
        (modal.grid.getSelected() as TModel[]).forEach(slectedItem => {
          const foundedGroup = this.mockedItems && this.mockedItems.find(item => item.id === slectedItem.id);
          if (!foundedGroup) {
            observables.push(this.repository.create(slectedItem));
          }
        });
        if (observables.length) {
          forkJoin(
            ...observables
          ).subscribe(
            (modalItems: TModel[]) => {
              modal.processing = false;
              if (this.mockedItems) {
                modalItems.forEach(modalItem =>
                  this.mockedItems.unshift(modalItem)
                );
                this.mockedItemsChange.emit(this.mockedItems);
              }
              modal.hide();
            },
            error => this.onAppendFromGridError(modal, error)
            );
        } else {
          modal.hide();
        }
      });
  }
}
