import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AccountConfig, AccountService, ErrorsExtractor, Group, User } from '@rucken/core';
import { first } from 'rxjs/operators';
import { MessageModalService } from '../../../../components/modals/message-modal/message-modal.service';
import { BasePromptPanelComponent } from '../../../base/base-prompt-panel.component';

@Component({
  selector: 'profile-panel',
  templateUrl: './profile-panel.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProfilePanelComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ProfilePanelComponent), multi: true }
  ]
})
export class ProfilePanelComponent extends BasePromptPanelComponent<User> {

  @Input()
  apiUrl?: string;
  @Input()
  enableSave = true;

  constructor(
    private _errorsExtractor: ErrorsExtractor,
    private _accountService: AccountService,
    private _accountConfig: AccountConfig,
    private _messageModalService: MessageModalService
  ) {
    super(User);
    this._accountService.current$.pipe(first()).subscribe(
      user => this.data = user
    );
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
    this._accountService.update(
      this.data
    ).subscribe(
      data => this.onSave(data),
      error => this.onSaveError(error)
      );
  }
  onSave(data: { token: string; user: User; }) {
    this.data = data.user;
  }
  onError(error: any) {
    this._messageModalService.error({
      error: this._errorsExtractor.getErrorMessage(error)
    }).subscribe();
  }
  onSaveError(error: any) {
    this.form.externalErrors = this._errorsExtractor.getValidationErrors(error);
    if (!this.form.externalErrors) {
      this.onError(error);
    }
  }
}
