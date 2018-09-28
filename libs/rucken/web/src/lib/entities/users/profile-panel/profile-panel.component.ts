import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AccountService,
  AuthService,
  ErrorsExtractor,
  Group,
  User
} from '@rucken/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BasePromptPanelComponent } from '../../../base/base-prompt-panel.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';

@Component({
  selector: 'profile-panel',
  templateUrl: './profile-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfilePanelComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfilePanelComponent),
      multi: true
    }
  ]
})
export class ProfilePanelComponent extends BasePromptPanelComponent<User>
  implements OnDestroy {
  @Input()
  apiUrl?: string;
  @Input()
  enableSave = true;
  @Input()
  simpleMode = false;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _errorsExtractor: ErrorsExtractor,
    private _authService: AuthService,
    private _accountService: AccountService,
    private _messageModalService: MessageModalService,
    private _permissionsService: NgxPermissionsService
  ) {
    super(User);
    this._authService.current$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(user => {
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
  onSaveClick(saveData?: any) {
    this.processing = true;
    this._accountService
      .update(this.data)
      .subscribe(
        data => this.onSave(data, saveData),
        error => this.onSaveError(error)
      );
  }
  onSave(user: User, saveData?: any) {
    this.processing = false;
    this.data = user;
  }
  onError(error: any) {
    this._messageModalService
      .error({
        error: error
      })
      .subscribe();
  }
  onSaveError(error: any) {
    this.processing = false;
    this.form.externalErrors = this._errorsExtractor.getValidationErrors(error);
    if (!this.form.externalErrors) {
      this.onError(error);
    }
  }
}
