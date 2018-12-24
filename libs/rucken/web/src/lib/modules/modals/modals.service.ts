import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, IModalRef, ModalsService } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from './message-modal.component';

@Injectable()
export class WebModalsService extends ModalsService {
  componentInfoModal: MessageModalComponent;
  componentErrorModal: MessageModalComponent;
  yesClass = 'btn btn-primary';
  modalClass = 'modal-md';

  private _onTopIsActive = false;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _translateService: TranslateService,
    private _modalService: BsModalService,
    private _errorsExtractor: ErrorsExtractor
  ) {
    super();
  }
  createAsync<TComponent>(component: string | TemplateRef<TComponent>, options?: any): Promise<IModalRef<TComponent>> {
    if (options.class === undefined) {
      options.class = this.modalClass;
    }
    const bsModalRef: BsModalRef = this._modalService.show(component, options);
    bsModalRef.content.yes.subscribe((modal: MessageModalComponent) => {
      this._onTopIsActive = false;
    });
    bsModalRef.content.no.subscribe((modal: MessageModalComponent) => {
      this._onTopIsActive = false;
    });
    const modalRef: IModalRef<TComponent> = {
      instance: bsModalRef.content,
      hide: function () {
        this.hide();
      }.bind(bsModalRef)
    };
    if (bsModalRef.content.yesClass === undefined) {
      bsModalRef.content.yesClass = this.yesClass;
    }
    if (bsModalRef.content.noClass === undefined) {
      bsModalRef.content.noClass = this.noClass;
    }
    bsModalRef.content.modalRef = modalRef;
    return Promise.resolve(modalRef);
  }
  infoAsync(options: { message: string | any; title?: string; class?: string; onTop?: boolean }) {
    if (this._onTopIsActive) {
      return Promise.resolve(undefined);
    }
    if (isPlatformServer(this._platformId)) {
      return Promise.resolve(undefined);
    }
    return new Promise((resolve, reject) => {
      const message = options.message;
      if (options.title === undefined) {
        options.title = this._translateService.instant('Info');
      }
      if (options.class === undefined) {
        options.class = this.getKlassOfMessageLength(message) || this.modalClass;
      }
      this._onTopIsActive = options.onTop;
      // todo: Change to create with create method
      const bsModalRef: BsModalRef = this._modalService.show(this.componentInfoModal, {
        class: options.class,
        ignoreBackdropClick: options.onTop === true,
        keyboard: !(options.onTop === true),
        initialState: {
          title: options.title,
          message: message,
          isInfo: true,
          yesTitle: this._translateService.instant('OK')
        }
      });
      if (bsModalRef.content.yesClass === undefined) {
        bsModalRef.content.yesClass = this.yesClass;
      }
      if (bsModalRef.content.noClass === undefined) {
        bsModalRef.content.noClass = this.noClass;
      }
      bsModalRef.content.yes.subscribe((modal: MessageModalComponent) => {
        bsModalRef.hide();
        resolve(true);
        this._onTopIsActive = false;
      });
      bsModalRef.content.no.subscribe((modal: MessageModalComponent) => {
        bsModalRef.hide();
        resolve(false);
        this._onTopIsActive = false;
      });
    });
  }
  errorAsync(options: { error: string | any; title?: string; class?: string; onTop?: boolean }) {
    if (this._onTopIsActive) {
      return Promise.resolve(undefined);
    }
    if (isPlatformServer(this._platformId)) {
      return Promise.resolve(undefined);
    }
    return new Promise((resolve, reject) => {
      const message = this._errorsExtractor.getErrorMessage(options.error);
      this.onErrorInConsole(options.error, message);
      if (options.title === undefined) {
        options.title = this._translateService.instant('Error');
      }
      if (options.class === undefined) {
        options.class = this.getKlassOfMessageLength(message) || this.modalClass;
      }
      this._onTopIsActive = options.onTop;
      // todo: Change to create with create method
      const bsModalRef: BsModalRef = this._modalService.show(this.componentErrorModal || MessageModalComponent, {
        class: options.class,
        ignoreBackdropClick: options.onTop === true,
        keyboard: !(options.onTop === true),
        initialState: {
          title: options.title,
          message: message,
          isError: true,
          yesTitle: this._translateService.instant('OK')
        }
      });
      if (bsModalRef.content.yesClass === undefined) {
        bsModalRef.content.yesClass = this.yesClass;
      }
      if (bsModalRef.content.noClass === undefined) {
        bsModalRef.content.noClass = this.noClass;
      }
      bsModalRef.content.yes.subscribe((modal: MessageModalComponent) => {
        bsModalRef.hide();
        resolve(true);
        this._onTopIsActive = false;
      });
      bsModalRef.content.no.subscribe((modal: MessageModalComponent) => {
        bsModalRef.hide();
        resolve(false);
        this._onTopIsActive = false;
      });
    });
  }
  private getKlassOfMessageLength(message: string) {
    return message ? (message.length > 150 ? 'modal-md' : 'modal-sm') : undefined;
  }
  private onErrorInConsole(error: any, message?: string): void {
    if (error && console && console.group && console.error) {
      console.group(this._translateService.instant('Error Log'));
      if (message) {
        console.error(message);
      }
      if (error) {
        console.error(error);
        if (error.stack) {
          console.error(error.stack);
        }
      }
      console.groupEnd();
    }
  }
}
