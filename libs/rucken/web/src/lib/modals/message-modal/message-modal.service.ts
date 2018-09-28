import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MessageModalComponent } from './message-modal.component';

@Injectable()
export class MessageModalService {
  componentInfoModal: any;
  componentErrorModal: any;
  private _onTopIsActive = false;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _translateService: TranslateService,
    private _modalService: BsModalService,
    private _errorsExtractor: ErrorsExtractor
  ) {}
  info(options: {
    message: string | any;
    title?: string;
    class?: string;
    onTop?: boolean;
  }) {
    if (this._onTopIsActive) {
      return of(false);
    }
    if (isPlatformServer(this._platformId)) {
      return of(false);
    }
    return new Observable(observe => {
      const message = options.message;
      if (options.title === undefined) {
        options.title = this._translateService.instant('Info');
      }
      if (options.class === undefined) {
        options.class = this.getKlassOfMessageLength(message);
      }
      this._onTopIsActive = options.onTop;
      const bsModalRef: BsModalRef = this._modalService.show(
        this.componentInfoModal || MessageModalComponent,
        {
          class: options.class,
          ignoreBackdropClick: options.onTop === true,
          keyboard: !(options.onTop === true),
          initialState: {
            title: options.title,
            message: message,
            isInfo: true,
            yesTitle: this._translateService.instant('OK')
          }
        }
      );
      bsModalRef.content.yes.subscribe((modal: MessageModalComponent) => {
        modal.hide();
        observe.next(true);
        this._onTopIsActive = false;
      });
      bsModalRef.content.no.subscribe((modal: MessageModalComponent) => {
        modal.hide();
        observe.next(false);
        this._onTopIsActive = false;
      });
    }).pipe(first());
  }
  error(options: {
    error: string | any;
    title?: string;
    class?: string;
    onTop?: boolean;
  }) {
    if (this._onTopIsActive) {
      return of(false);
    }
    if (isPlatformServer(this._platformId)) {
      return of(false);
    }
    return new Observable(observe => {
      const message = this._errorsExtractor.getErrorMessage(options.error);
      this.onErrorInConsole(options.error, message);
      if (options.title === undefined) {
        options.title = this._translateService.instant('Error');
      }
      if (options.class === undefined) {
        options.class = this.getKlassOfMessageLength(message);
      }
      this._onTopIsActive = options.onTop;
      const bsModalRef: BsModalRef = this._modalService.show(
        this.componentErrorModal || MessageModalComponent,
        {
          class: options.class,
          ignoreBackdropClick: options.onTop === true,
          keyboard: !(options.onTop === true),
          initialState: {
            title: options.title,
            message: message,
            isError: true,
            yesTitle: this._translateService.instant('OK')
          }
        }
      );
      bsModalRef.content.yes.subscribe((modal: MessageModalComponent) => {
        modal.hide();
        observe.next(true);
        this._onTopIsActive = false;
      });
      bsModalRef.content.no.subscribe((modal: MessageModalComponent) => {
        modal.hide();
        observe.next(false);
        this._onTopIsActive = false;
      });
    }).pipe(first());
  }
  private getKlassOfMessageLength(message: string) {
    return message && message.length > 150 ? 'modal-md' : 'modal-sm';
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
