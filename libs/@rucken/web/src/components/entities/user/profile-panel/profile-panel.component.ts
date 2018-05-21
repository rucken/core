import { Component, Input, OnDestroy, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AccountConfig, AccountService, ErrorsExtractor, Group, User } from '@rucken/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { MessageModalService } from '../../../../components/modals/message-modal/message-modal.service';
import { BasePromptPanelComponent } from '../../../base/base-prompt-panel.component';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'profile-panel',
  templateUrl: './profile-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProfilePanelComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ProfilePanelComponent), multi: true }
  ]
})
export class ProfilePanelComponent extends BasePromptPanelComponent<User> implements OnDestroy {

  @Input()
  apiUrl?: string;
  @Input()
  enableSave = true;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _errorsExtractor: ErrorsExtractor,
    private _accountService: AccountService,
    private _accountConfig: AccountConfig,
    private _messageModalService: MessageModalService,
    private _permissionsService: NgxPermissionsService
  ) {
    super(User);
    this._accountService.current$.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(user => {
      if (user) {
        this.data = user;
      }
    });
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  get isReadonly() {
    return this.readonly || !this.enableSave;
  }
  onGroupsChange(groups: Group[]) {
    // todo: remove after ngx-dynamic-form-builder updated with correct work with arrays
    const data: User = this.data;
    data.groups = groups;
    this.data = data;
    this.onSaveClick();
  }
  onSaveClick() {
    this.processing = true;
    this._accountService.update(
      this.data
    ).subscribe(
      data => this.onSave(data),
      error => this.onSaveError(error)
      );
  }
  onSave(data: { token: string; user: User; }) {
    this.processing = false;
    this.data = data.user;
  }
  onError(error: any) {
    this._messageModalService.error({
      error: error
    }).subscribe();
  }
  onSaveError(error: any) {
    this.processing = false;
    this.form.externalErrors = this._errorsExtractor.getValidationErrors(error);
    if (!this.form.externalErrors) {
      this.onError(error);
    }
  }
}
