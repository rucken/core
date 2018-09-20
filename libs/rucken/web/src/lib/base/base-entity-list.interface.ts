import { EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IModel, Repository } from 'ngx-repository';

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
  modalService: BsModalService;
  getSelected(): TModel[];
}
