import { ComponentFactoryResolver, Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class WebAppService extends AppService {

  component: any;
  translateService: TranslateService;

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    public injector: Injector
  ) {
    super();
    this.translateService = injector.get(TranslateService);
  }
  set localVersion(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage && value) {
        localStorage.setItem('version', value);
      }
    }
  }
  get localVersion(): string {
    if (isPlatformBrowser(this.platformId)) {
      if (
        localStorage &&
        localStorage.getItem('version')
      ) {
        return (localStorage.getItem('version') as string);
      }
    }
    return '';
  }
  get currentVersion() {
    let ver = 'none';
    if (isPlatformBrowser(this.platformId)) {
      const metaList = document.getElementsByTagName('meta');
      for (let i = 0; i < metaList.length; i++) {
        const meta = metaList[i];
        if (
          meta.getAttribute('name') !== null &&
          (meta.getAttribute('name') as string).indexOf('version') === 0
        ) {
          ver = (meta.getAttribute('content') as string);
        }
      }
    }
    return ver;
  }
  modals(resolver: ComponentFactoryResolver): any {
    const vm = this;
    return {
      exists(name: string): boolean {
        return vm._createdModals[name] !== undefined;
      },
      create(modal: { new(): any }, name?: string): any {
        let inModal: boolean;
        if (isPlatformBrowser(this.platformId)) {
          inModal = document.body.classList.contains('modal-open');
        }
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
          if (isPlatformBrowser(this.platformId)) {
            if (inModal && !document.body.classList.contains('modal-open')) {
              document.body.classList.add('modal-open');
            }
          }
        });
        ref.instance.modal.config = {};
        return ref.instance;
      }
    };
  }
}
