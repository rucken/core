import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AccountService, AppService, User } from '@rucken/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'base-component',
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {

  @Input()
  account: any | User;
  @Input()
  tooltipEnable?: boolean;
  @Input()
  tooltipText?: string;
  @Input()
  tooltipPlacement?: string;
  @Input()
  tooltipTriggers?: string;
  @Input()
  name?: string;
  @Input()
  focused: boolean;
  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();

  errorsValue: any;
  infoValue: any;
  [key: string]: any;

  destroyed$: Subject<boolean>;

  accountService: AccountService;
  app: AppService;
  translateService: TranslateService;
  sharedService: SharedService;
  sanitizer: DomSanitizer;

  constructor(
    public injector: Injector
  ) {
    this.destroyed$ = new Subject<boolean>();
    this.accountService = injector.get(AccountService);
    this.app = injector.get(AppService);
    this.translateService = injector.get(TranslateService);
    this.sharedService = injector.get(SharedService);
    this.sanitizer = injector.get(DomSanitizer);
  }

  get errorMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.name && this.errorsValue && this.errorsValue[this.name]) {
      for (let i = 0; i < this.errorsValue[this.name].length; i++) {
        if (this.errorsValue[this.name][i]) {
          text = this.translateService.instant(this.errorsValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  get infoMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.name && this.infoValue && this.infoValue[this.name]) {
      for (let i = 0; i < this.infoValue[this.name].length; i++) {
        if (this.infoValue[this.name][i]) {
          text = this.translateService.instant(this.infoValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  ngOnInit() {
    if (this.app && this.app.translateService && this.translateService) {
      this.translateService.store = this.app.translateService.store;
    }
    this.afterCreate();
    this.init();
  }
  afterCreate() {
    if (this.accountService) {
      this.accountService.account$.pipe(takeUntil(this.destroyed$)).subscribe((account: any | User) => this.account = account);
      this.account = this.accountService.account;
    }
  }
  init() {
    if (this.errors) {
      this.errors.subscribe((data: any) => {
        this.errorsValue = data;
        const keys = Object.keys(data);
        if (keys[0] === this.name) {
          this.focus();
        }
        this.tooltipText = this.errorMessage;
      });
    }
    if (this.info) {
      this.info.subscribe((data: any) => {
        this.infoValue = data;
        const keys = Object.keys(data);
        if (keys[0] === this.name) {
          this.focus();
        }
        this.tooltipText = this.infoMessage;
      });
    }
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = false;
    }
    if (this.focused === undefined) {
      this.focused = false;
    }
    if (this.tooltipText === undefined) {
      this.tooltipText = '';
    }
    if (this.tooltipPlacement === undefined) {
      this.tooltipPlacement = 'bottom';
    }
    if (this.tooltipTriggers === undefined) {
      this.tooltipTriggers = 'hover focus';
    }
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 300);
  }
  checkPermissions(permissionNames: string[]) {
    if (this.account) {
      return this.account.checkPermissions(permissionNames);
    }
    return false;
  }
  keys(object: {}) {
    return Object.keys(object);
  }
  focus() {
    let inputElement: any = this.inputElement;
    if (!inputElement) {
      inputElement = this.focusElement;
    }
    while (inputElement) {
      if (inputElement.focus) {
        inputElement.focus();
        break;
      }
      if (inputElement && inputElement.nativeElement) {
        inputElement = inputElement.nativeElement;
      } else {
        if (inputElement && inputElement.inputElement) {
          inputElement = inputElement.inputElement;
        } else {
          break;
        }
      }
    }
  }
  showTooltip() {
    const tooltip: any = this.tooltip;
    if (!tooltip._tooltip || !tooltip._tooltip._componentRef || !tooltip._tooltip._componentRef.location.nativeElement) {
      return;
    }
    const tooltipInner: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-inner')[0];
    const tooltipArrow: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-arrow')[0];
    if (this.inputElement.inputElement) {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.inputElement.nativeElement).borderColor;
    } else {
      tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
      tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
    }
  }
}
