import { BsModalService } from 'ngx-bootstrap/modal';
import { IModel } from 'ngx-repository';
export interface IBaseEntityModals<TModel extends IModel> {
  modalItemComponent: any;
  modalDeleteComponent: any;
  modalCreateComponent: any;
  modalUpdateComponent: any;
  modalViewComponent: any;
  modalAppendFromGridComponent: any;
  modalItemClass: string;
  modalDeleteClass: string;
  modalCreateClass: string;
  modalUpdateClass: string;
  modalViewClass: string;
  modalAppendFromGridClass: string;
}
