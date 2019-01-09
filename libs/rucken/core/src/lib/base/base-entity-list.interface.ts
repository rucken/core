import { EventEmitter } from '@angular/core';
import { IModel, Repository } from 'ngx-repository';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { ModalsService } from '../modules/modals/modals.service';
import { BaseEntityListModalComponent } from './base-entity-list-modal.component';

export interface IBaseEntityList<TModel extends IModel> {
  processing: boolean;
  apiUrl?: string;
  mockedItems?: TModel[];
  mockedItemsChange: EventEmitter<TModel[]>;
  selected: EventEmitter<TModel[]>;
  readonly: boolean;
  title: string;
  strings?: {
    viewTitle?: string;
    createTitle?: string;
    updateTitle?: string;
    deleteTitle?: string;
    deleteMessage?: string;
    selectTitle?: string;
    [key: string]: string;
  };
  repository: Repository<TModel>;
  modalsService: ModalsService;
  getSelected(): TModel[];
}
