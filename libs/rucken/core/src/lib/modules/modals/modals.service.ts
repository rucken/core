import { Injectable, TemplateRef } from '@angular/core';
import { IModalRef } from './modal-ref.interface';

@Injectable()
export class ModalsService {
  componentInfoModal: string | TemplateRef<any> | any;
  componentErrorModal: string | TemplateRef<any> | any;
  constructor() {}
  createAsync<TComponent>(
    component: string | TemplateRef<TComponent> | any,
    options?: any
  ): Promise<IModalRef<TComponent>> {
    return Promise.resolve({ instance: undefined, hide: () => {} });
  }
  async info(options: any): Promise<any> {
    await this.infoAsync(options);
  }
  infoAsync(options: any): Promise<any> {
    return this.createAsync(this.componentInfoModal, options);
  }
  async error(options: any): Promise<any> {
    await this.errorAsync(options);
  }
  errorAsync(options: any): Promise<any> {
    return this.createAsync(this.componentErrorModal, options);
  }
}
