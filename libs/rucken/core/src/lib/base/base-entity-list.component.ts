import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { IFactoryModel, IMockProviderOptions, IModel, IPaginationMeta, IRestProviderOptions, Repository } from 'ngx-repository';
import { forkJoin, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { ModalsService } from '../modules/modals/modals.service';
import { ErrorsExtractor } from '../utils/errors-extractor';
import { translate } from '../utils/translate';
import { IBaseEntityGridFilter } from './base-entity-grid-filter.interface';
import { BaseEntityListModalComponent } from './base-entity-list-modal.component';
import { IBaseEntityList } from './base-entity-list.interface';
import { IBaseEntityModalOptions, IBaseEntityModals } from './base-entity-modals.interface';
import { BasePromptFormModalComponent } from './base-prompt-form-modal.component';

export class BaseEntityListComponent<TModel extends IModel> implements IBaseEntityList<TModel>, IBaseEntityModals {
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
  createLink: string = undefined;
  @Input()
  viewLink: string = undefined;
  @Input()
  updateLink: string = undefined;
  @Input()
  deleteLink: string = undefined;
  @Input()
  apiUrl?: string = undefined;
  @Input()
  mockedItems: TModel[] = undefined;
  @Output()
  mockedItemsChange: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  strings: {
    viewTitle?: string;
    createTitle?: string;
    updateTitle?: string;
    deleteTitle?: string;
    deleteMessage?: string;
    selectTitle?: string;
    [key: string]: string;
  } = undefined;
  @Output()
  selected: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  readonly: boolean = undefined;
  @Input()
  title: string = undefined;
  @Input()
  filter: IBaseEntityGridFilter = { searchText: '', sort: '-id' };

  paginationMeta$: Observable<IPaginationMeta>;
  items$: Observable<TModel[]>;
  createData: any;
  appendFromGridData: any;

  private _selected: TModel[] = [];

  constructor(
    public repository: Repository<TModel>,
    public modalsService: ModalsService,
    public factoryModel: IFactoryModel<TModel>,
    protected errorsExtractor?: ErrorsExtractor
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
  useRest(options?: IRestProviderOptions<TModel>) {
    this.repository.useRest(options);
    this.items$ = this.repository.items$;
    this.paginationMeta$ = this.repository.paginationMeta$;
  }
  useMock(options?: IMockProviderOptions<TModel>) {
    this.repository.useMock(options);
    this.items$ = this.repository.items$;
    this.paginationMeta$ = this.repository.paginationMeta$;
  }
  getSelected() {
    return this._selected;
  }
  onSelected(selected: TModel[]) {
    this._selected = selected;
    this.selected.emit(this._selected);
  }
  onChangePage(meta: { page: number; itemsPerPage: number }) {
    this.repository.setOptions({
      paginationMeta: { curPage: meta.page, perPage: meta.itemsPerPage }
    });
  }
  onNextPage() {
    this.repository.setOptions({
      paginationMeta: { curPage: this.repository.paginationMeta$.getValue().curPage + 1 }
    });
    if (!this.repository.provider.getOptions().autoload) {
      this.onReload();
    }
  }
  onChangeFilter(filter?: IBaseEntityGridFilter) {
    if (!filter) {
      filter = {};
    }
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
    this.repository
      .loadAll(this.filter)
      .pipe(first())
      .subscribe(items => this.onSuccess(items), error => this.onError(error));
  }
  onReload() {
    this.onChangeFilter();
  }
  onSearch(searchText: string) {
    searchText = searchText ? searchText : '';
    if (typeof searchText === 'string') {
      this.onChangeFilter({ searchText });
    }
  }
  onChangeOrder(fieldName: string) {
    this.onChangeFilter({ sort: fieldName });
  }
  onSuccess(items: TModel[]) {
    this.processing = false;
  }
  onError(error: any) {
    this.processing = false;
    if (isDevMode()) {
      console.warn('Method "onError" is not defined', this);
    }
    if (this.modalsService) {
      this.modalsService.error({
        error: error
      });
    } else {
      if (isDevMode()) {
        console.warn('ModalsService is not injected', this);
      }
    }
  }
  async defaultCreateViewModal(item: TModel) {
    const title = this.strings && this.strings.viewTitle ? this.strings.viewTitle : translate('Item #{{id}}');
    const modalRef = await this.modalsService.createAsync<BasePromptFormModalComponent<TModel>>(
      this.modalView.component || this.modalItem.component,
      {
        class: this.modalView.class || this.modalItem.class,
        initialState: {
          title: title,
          noTitle: translate('Close'),
          readonly: true,
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalView.initialState || this.modalItem.initialState)
        }
      }
    );
    modalRef.instance.group(this.factoryModel);
    if (modalRef.instance.setData) {
      modalRef.instance.setData(item);
    }
    return modalRef;
  }
  createViewModal(item: TModel) {
    return Promise.resolve<IModalRef<BasePromptFormModalComponent<TModel>>>(undefined);
  }
  onViewClick(item: TModel) {
    this.onViewClickAsync(item).then();
  }
  async onViewClickAsync(item: TModel) {
    const useCustomModalComponent = this.modalView.component || this.modalItem.component;
    let modalRef = !useCustomModalComponent ? this.createViewModal(item) : undefined;
    if (!modalRef) {
      modalRef = this.defaultCreateViewModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createViewModal" is not defined', this);
      }
    }
    return modalRef;
  }
  async defaultCreateCreateModal(item?: TModel) {
    const title = this.strings && this.strings.createTitle ? this.strings.createTitle : translate('Create new item');
    item = item || new this.factoryModel();
    const modalRef = await this.modalsService.createAsync<BasePromptFormModalComponent<TModel>>(
      this.modalCreate.component || this.modalItem.component,
      {
        class: this.modalCreate.class || this.modalItem.class,
        initialState: {
          title: title,
          yesTitle: translate('Create'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalCreate.initialState || this.modalItem.initialState)
        }
      }
    );
    modalRef.instance.group(this.factoryModel);
    if (modalRef.instance.setData) {
      modalRef.instance.setData(item);
    }
    return modalRef;
  }
  createCreateModal(data?: any) {
    return Promise.resolve<IModalRef<BasePromptFormModalComponent<TModel>>>(undefined);
  }
  onCreateError(modal: BasePromptFormModalComponent<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (isDevMode()) {
      console.warn('Method "onCreateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      const externalErrors = this.errorsExtractor.getValidationErrors(error);
      modal.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
  onCreateClick(data?: any): void {
    this.onCreateClickAsync(data).then();
  }
  async onCreateClickAsync(data?: any) {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    this.createData = data;
    let modalRef = !useCustomModalComponent ? await this.createCreateModal(data) : undefined;
    if (!modalRef) {
      modalRef = await this.defaultCreateCreateModal(data);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createCreateModal" is not defined', this);
      }
    }
    modalRef.instance.yes.subscribe((modal: BasePromptFormModalComponent<TModel>) => {
      modal.processing = true;
      this.repository.create(modal.getData()).subscribe(
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
  async defaultCreateUpdateModal(item: TModel) {
    const title =
      this.strings && this.strings.updateTitle ? this.strings.updateTitle : translate('Update item #{{id}}');
    const modalRef = await this.modalsService.createAsync<BasePromptFormModalComponent<TModel>>(
      this.modalUpdate.component || this.modalItem.component,
      {
        class: this.modalUpdate.class || this.modalItem.class,
        initialState: {
          title: title,
          yesTitle: translate('Save'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalUpdate.initialState || this.modalItem.initialState)
        }
      }
    );
    modalRef.instance.group(this.factoryModel);
    if (modalRef.instance.setData) {
      modalRef.instance.setData(item);
    }
    return modalRef;
  }
  createUpdateModal(item: TModel) {
    return Promise.resolve<IModalRef<BasePromptFormModalComponent<TModel>>>(undefined);
  }
  onUpdateError(modal: BasePromptFormModalComponent<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (isDevMode()) {
      console.warn('Method "onUpdateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      const externalErrors = this.errorsExtractor.getValidationErrors(error);
      modal.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
  onUpdateClick(item: TModel) {
    this.onUpdateClickAsync(item).then();
  }
  async onUpdateClickAsync(item: TModel) {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    let modalRef = !useCustomModalComponent ? await this.createUpdateModal(item) : undefined;
    if (!modalRef) {
      modalRef = await this.defaultCreateUpdateModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createUpdateModal" is not defined', this);
      }
    }
    modalRef.instance.yes.subscribe((modal: BasePromptFormModalComponent<TModel>) => {
      modal.processing = true;
      this.repository.update(item.id, modal.getData()).subscribe(
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
  async defaultCreateDeleteModal(item: TModel) {
    const title =
      this.strings && this.strings.deleteTitle ? this.strings.deleteTitle : translate('Delete item #{{id}}');
    const message =
      this.strings && this.strings.deleteMessage
        ? this.strings.deleteMessage
        : translate('Do you really want to delete item?');
    const modalRef = await this.modalsService.createAsync<BasePromptFormModalComponent<TModel>>(
      this.modalDelete.component || this.modalItem.component,
      {
        class: this.modalDelete.class || this.modalItem.class,
        initialState: {
          title: title,
          message: message,
          yesTitle: translate('Delete'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalDelete.initialState || this.modalItem.initialState)
        }
      }
    );
    modalRef.instance.group(this.factoryModel);
    if (modalRef.instance.setData) {
      modalRef.instance.setData(item);
    }
    return modalRef;
  }
  createDeleteModal(item: TModel) {
    return Promise.resolve<IModalRef<BasePromptFormModalComponent<TModel>>>(undefined);
  }
  onDeleteError(modal: BasePromptFormModalComponent<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (isDevMode()) {
      console.warn('Method "onDeleteError" is not defined', this);
    }
    if (this.errorsExtractor) {
      const externalErrors = this.errorsExtractor.getValidationErrors(error);
      modal.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
  onDeleteClick(item: TModel) {
    this.onDeleteClickAsync(item).then();
  }
  async onDeleteClickAsync(item: TModel) {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    let modalRef = !useCustomModalComponent ? await this.createDeleteModal(item) : undefined;
    if (!modalRef) {
      modalRef = await this.defaultCreateDeleteModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createDeleteModal" is not defined', this);
      }
    }
    modalRef.instance.yes.subscribe((modal: BasePromptFormModalComponent<TModel>) => {
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
  async defaultAppendFromGridModal(data?: any) {
    const title = this.strings && this.strings.selectTitle ? this.strings.selectTitle : translate('Select item');
    const modalRef = await this.modalsService.createAsync<BaseEntityListModalComponent<TModel>>(
      this.modalAppendFromGrid.component,
      {
        class: this.modalAppendFromGrid.class || this.modalItem.class,
        initialState: {
          title: title,
          yesTitle: translate('Append'),
          apiUrl: this.apiUrl,
          ...this.modalAppendFromGrid.initialState
        }
      }
    );
    return modalRef;
  }
  createAppendFromGridModal(data?: any) {
    return Promise.resolve<IModalRef<BaseEntityListModalComponent<TModel>>>(undefined);
  }
  onAppendFromGridError(modal: BaseEntityListModalComponent<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (isDevMode()) {
      console.warn('Method "onAppendFromGridError" is not defined', this);
    }
    if (this.errorsExtractor) {
      this.onError(error);
    }
  }
  onAppendFromGridClick(data?: any) {
    this.onAppendFromGridClickAsync(data).then();
  }
  async onAppendFromGridClickAsync(data?: any) {
    this.appendFromGridData = data;
    const useCustomModalComponent = this.modalAppendFromGrid.component;
    let modalRef = !useCustomModalComponent ? await this.createAppendFromGridModal(data) : undefined;
    if (!modalRef) {
      modalRef = await this.defaultAppendFromGridModal(data);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createAppendFromGridModal" is not defined', this);
        return;
      }
    }
    modalRef.instance.yes.subscribe((modal: BaseEntityListModalComponent<TModel>) => {
      modal.processing = true;
      const observables = [];
      const selected = modal.grid.getSelected() as TModel[];
      if (selected) {
        selected.forEach(slectedItem => {
          const foundedGroup = this.mockedItems && this.mockedItems.find(item => item.id === slectedItem.id);
          if (!foundedGroup) {
            observables.push(this.repository.create(slectedItem));
          }
        });
      }
      if (observables.length) {
        forkJoin(...observables).subscribe(
          (modalItems: TModel[]) => {
            modal.processing = false;
            if (this.mockedItems) {
              if (modalItems) {
                modalItems.forEach(modalItem => this.mockedItems.unshift(modalItem));
              }
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
