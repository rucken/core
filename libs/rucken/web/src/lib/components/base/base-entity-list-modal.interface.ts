import { IModel } from 'ngx-repository';
import { IBaseEntityList } from './base-entity-list.interface';

export interface IBaseEntityListModal<TModel extends IModel> {
  processing: boolean;
  grid: IBaseEntityList<TModel>;
  hide(): void;
}
