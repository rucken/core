import { Injectable, TemplateRef } from '@angular/core';
import { IModalRef } from './modal-ref.interface';

@Injectable()
export class ModalsService {
  componentInfoModal: string | TemplateRef<any> | any;
  componentErrorModal: string | TemplateRef<any> | any;
  componentConfirmModal: string | TemplateRef<any> | any;
  componentPromptModal: string | TemplateRef<any> | any;
  modalClass: string;
  yesClass: string;
  noClass: string;

  createAsync<TComponent>(
    component: string | TemplateRef<TComponent> | any,
    options?: any
  ): Promise<IModalRef<TComponent>> {
    return Promise.resolve({ instance: undefined, hide: () => {} });
  }
  info(options: any) {
    this.infoAsync(options).then();
  }
  async infoAsync(options: any): Promise<any> {
    return await this.createAsync(this.componentInfoModal, options);
  }
  error(options: any) {
    this.errorAsync(options).then();
  }
  async errorAsync(options: any): Promise<any> {
    return await this.createAsync(this.componentErrorModal, options);
  }
  confirm(options: any) {
    this.confirmAsync(options).then();
  }
  async confirmAsync(options: any): Promise<any> {
    return await this.createAsync(this.componentConfirmModal, options);
  }
  prompt(options: any) {
    this.promptAsync(options).then();
  }
  async promptAsync(options: any): Promise<any> {
    return await this.createAsync(this.componentPromptModal, options);
  }
}
