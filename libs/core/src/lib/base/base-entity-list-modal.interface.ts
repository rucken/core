import { IModel } from 'ngx-repository';
import { IModalRef } from '../modules/modals/modal-ref.interface';
import { BaseEntityListModalComponent } from './base-entity-list-modal.component';
import { IBaseEntityList } from './base-entity-list.interface';
import { IBaseEntityModals } from './base-entity-modals.interface';

export interface IBaseEntityListModal<TModel extends IModel> extends IBaseEntityModals {
  processing: boolean;
  grid: IBaseEntityList<TModel>;
  modalRef: IModalRef<BaseEntityListModalComponent<TModel>>;
  hide(): void;
}
