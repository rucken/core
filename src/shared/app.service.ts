import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { EndpointHelper } from './helpers/endpoint.helper';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Injectable()
export class AppService {
  component: any;
  viewContainerRef: ViewContainerRef;
  currentPageName: string;
  currentPageTitle: string;
  currentFrameName: string;
  currentFrameTitle: string;
  endpointHelper: EndpointHelper
  translate: TranslateService
  private createdModals: any = {};
  constructor(public location: Location) {

  }
  set localVersion(value: string) {
    localStorage.setItem('version', value);
  }
  get localVersion(): string {
    if (localStorage.getItem('version')) {
      return localStorage.getItem('version');
    }
    return '';
  }
  get currentVersion() {
    let ver = 'none';
    const metaList = document.getElementsByTagName('meta');
    for (let i = 0; i < metaList.length; i++) {
      const meta = metaList[i];
      if (meta.getAttribute('name') !== null && meta.getAttribute('name').indexOf('version') === 0) {
        ver = meta.getAttribute('content');
      }
    }
    return ver;
  }
  get version() {
    return `${this.translate.instant('Version')}: ${this.currentVersion}`;
  }
  modals(resolver: ComponentFactoryResolver): any {
    const vm = this;
    return {
      exists(name: string): boolean {
        return vm.createdModals[name] !== undefined;
      },
      create(modal: { new (): any }, name?: string): any {
        const inModal = document.body.classList.contains('modal-open');
        const factory = resolver.resolveComponentFactory(modal);
        const ref = vm.viewContainerRef.createComponent(factory);
        if (name !== undefined) {
          vm.createdModals[name] = ref;
          ref.instance.name = name;
        }
        ref.instance.currentLocation = location.href.replace(location.host, '').replace(location.protocol, '').replace('///', '');
        ref.instance.onClose.subscribe(() => {
          ref.destroy();
          if (name !== undefined) {
            delete vm.createdModals[name];
          }
          if (inModal && !document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
          }
        });
        ref.instance.modal.config = {};
        return ref.instance;
      }
    };
  }
}
