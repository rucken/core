import { IModel } from 'ngx-repository';

export class Theme implements IModel {
  id?: number;
  url?: string;
  name?: string;
}
