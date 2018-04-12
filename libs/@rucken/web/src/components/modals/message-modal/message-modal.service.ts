import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { MessageModalComponent } from './message-modal.component';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MessageModalService {

  private _onTopIsActive = false;

  constructor(
    private _translateService: TranslateService,
    private _modalService: BsModalService
  ) {

  }
  info(message: string, title?: string, klass?: string) {
    return new Observable(observe => {
      if (title === undefined) {
        title = this._translateService.instant('Info');
      }
      if (klass === undefined) {
        klass = this.getKlassOfMessageLength(message);
      }
      const bsModalRef: BsModalRef = this._modalService.show(MessageModalComponent, {
        class: klass,
        initialState: {
          title: title,
          message: message,
          isInfo: true,
          yesTitle: this._translateService.instant('OK')
        }
      });
      bsModalRef.content.yes.subscribe(
        (modal: MessageModalComponent) => {
          modal.hide();
          observe.next(true);
        });
      bsModalRef.content.no.subscribe(
        (modal: MessageModalComponent) => {
          modal.hide();
          observe.next(false);
        });
    }).pipe(first());
  }
  extractErrorMessage(error: string | any): string {
    return error && error.message ? error.message : (error && error.toString ? error.toString() : error);
  }
  error(options: { error: string | any, title?: string, class?: string, onTop?: boolean }) {
    if (this._onTopIsActive) {
      return of(false);
    }
    return new Observable(observe => {
      const message = this.extractErrorMessage(options.error);
      this.onErrorInConsole(options.error, message);
      if (options.title === undefined) {
        options.title = this._translateService.instant('Error');
      }
      if (options.class === undefined) {
        options.class = this.getKlassOfMessageLength(message);
      }
      this._onTopIsActive = options.onTop;
      const bsModalRef: BsModalRef = this._modalService.show(MessageModalComponent, {
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
      bsModalRef.content.yes.subscribe(
        (modal: MessageModalComponent) => {
          modal.hide();
          observe.next(true);
          this._onTopIsActive = false;
        });
      bsModalRef.content.no.subscribe(
        (modal: MessageModalComponent) => {
          modal.hide();
          observe.next(false);
          this._onTopIsActive = false;
        });
    }).pipe(first());
  }
  private getKlassOfMessageLength(message: string) {
    return message.length > 150 ? 'modal-md' : 'modal-sm';
  }
  private onErrorInConsole(error: any, message?: string): void {
    if (error && console && console.group && console.error) {
      console.group(this._translateService.instant(('Error Log')));
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
