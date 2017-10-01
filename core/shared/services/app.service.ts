import { ComponentFactoryResolver, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EndpointHelper } from './../helpers/endpoint.helper';

@Injectable()
export class AppService {
  component: any;
  viewContainerRef: ViewContainerRef;
  endpointHelper: EndpointHelper
  translateService: TranslateService;
  onCurrentPageName: EventEmitter<string> = new EventEmitter<string>();
  onCurrentPageTitle: EventEmitter<string> = new EventEmitter<string>();
  onCurrentFrameName: EventEmitter<string> = new EventEmitter<string>();
  onCurrentFrameTitle: EventEmitter<string> = new EventEmitter<string>();
  protected _currentPageName: string;
  protected _currentPageTitle: string;
  protected _currentFrameName: string;
  protected _currentFrameTitle: string;
  protected _createdModals: any = {};

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
    // you custom code in extended class
  }
  get localVersion(): string {
    // you custom code in extended class
    return '';
  }
  get currentVersion() {
    // you custom code in extended class
    return '';
  }
  get version() {
    return `${this.translateService.instant('Version')}: ${this.currentVersion}`;
  }
  modals(resolver: ComponentFactoryResolver): any {
    const vm = this;
    return {
      exists(name: string): boolean {
        return vm._createdModals[name] !== undefined;
      },
      create(modal: { new(): any }, name?: string): any {
        // you custom code in extended class
        const factory = resolver.resolveComponentFactory(modal);
        const ref = vm.viewContainerRef.createComponent(factory);
        if (name !== undefined) {
          vm._createdModals[name] = ref;
          ref.instance.name = name;
        }
        ref.instance.onClose.subscribe(() => {
          ref.destroy();
          if (name !== undefined) {
            delete vm._createdModals[name];
          }
        });
        ref.instance.modal.config = {};
        return ref.instance;
      }
    };
  }
}
