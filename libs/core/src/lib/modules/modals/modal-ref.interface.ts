export interface IModalRef<TComponent> {
  instance?: TComponent;
  hide: () => void;
  customData?: any;
}
