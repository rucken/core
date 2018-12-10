export interface IBaseEntityModalOptions {
  component?: any;
  class?: string;
  initialState?: Object;
}
export interface IBaseEntityModals {
  modalItem: IBaseEntityModalOptions;
  modalDelete: IBaseEntityModalOptions;
  modalCreate: IBaseEntityModalOptions;
  modalUpdate: IBaseEntityModalOptions;
  modalView: IBaseEntityModalOptions;
  modalAppendFromGrid: IBaseEntityModalOptions;
}
