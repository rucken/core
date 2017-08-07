import { Injectable, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { EndpointHelper } from './helpers/endpoint.helper';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Injectable()
export class AppService {
  component: any;
  viewContainerRef: ViewContainerRef;
  endpointHelper: EndpointHelper
  translate: TranslateService
  onCurrentPageName: EventEmitter<string> = new EventEmitter<string>();
  onCurrentPageTitle: EventEmitter<string> = new EventEmitter<string>();
  onCurrentFrameName: EventEmitter<string> = new EventEmitter<string>();
  onCurrentFrameTitle: EventEmitter<string> = new EventEmitter<string>();
  private _currentPageName: string;
  private _currentPageTitle: string;
  private _currentFrameName: string;
  private _currentFrameTitle: string;
  private _createdModals: any = {};
  constructor(public location: Location) {

  }
  set currentFrameTitle(value: string) {
    this._currentFrameTitle = value;
    this.onCurrentFrameTitle.emit(value);
  }
  get currentFrameTitle(): string {
    return this._currentFrameTitle;
  }
  set currentFrameName(value: string) {
    this._currentFrameName = value;
    this.onCurrentFrameName.emit(value);
  }
  get currentFrameName(): string {
    return this._currentFrameName;
  }
  set currentPageTitle(value: string) {
    this._currentPageTitle = value;
    this.onCurrentPageTitle.emit(value);
  }
  get currentPageTitle(): string {
    return this._currentPageTitle;
  }
  set currentPageName(value: string) {
    this._currentPageName = value;
    this.onCurrentPageName.emit(value);
  }
  get currentPageName(): string {
    return this._currentPageName;
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
        return vm._createdModals[name] !== undefined;
      },
      create(modal: { new(): any }, name?: string): any {
        const inModal = document.body.classList.contains('modal-open');
        const factory = resolver.resolveComponentFactory(modal);
        const ref = vm.viewContainerRef.createComponent(factory);
        if (name !== undefined) {
          vm._createdModals[name] = ref;
          ref.instance.name = name;
        }
        ref.instance.currentLocation = location.href.replace(location.host, '').replace(location.protocol, '').replace('///', '');
        ref.instance.onClose.subscribe(() => {
          ref.destroy();
          if (name !== undefined) {
            delete vm._createdModals[name];
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
