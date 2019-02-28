import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AccountService,
  AuthService,
  BasePromptPanelComponent,
  ErrorsExtractor,
  ModalsService,
  User
} from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { BindIoInner } from 'ngx-bind-io';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@BindIoInner()
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
export class ProfilePanelComponent extends BasePromptPanelComponent<User> implements OnDestroy, OnChanges {
  @Input()
  yesClass = 'btn btn-primary';
  @Input()
  apiUrl?: string = undefined;
  @Input()
  enableSave = true;
  @Input()
  simpleMode = false;

  @BindObservable()
  readonlyOrNotEnableSave: boolean = undefined;
  readonlyOrNotEnableSave$: Observable<boolean>;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _errorsExtractor: ErrorsExtractor,
    private _authService: AuthService,
    private _accountService: AccountService,
    private _modalsService: ModalsService
  ) {
    super(User);
    this._authService.current$.pipe(takeUntil(this._destroyed$)).subscribe(user => {
      if (user) {
        this.setData(user);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.readonly && changes.readonly.currentValue !== changes.readonly.previousValue) ||
      (changes.enableSave && changes.enableSave.currentValue !== changes.enableSave.previousValue)
    ) {
      this.readonlyOrNotEnableSave = this.readonly || !this.enableSave;
    }
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onSaveClick(saveData?: any) {
    this.processing = true;
    this._accountService
      .update(this.getData())
      .subscribe(data => this.onSave(data.user, saveData), error => this.onSaveError(error));
  }
  onSave(user: User, saveData?: any) {
    this.processing = false;
    this.form.clearExternalErrorsAsync().then(() => {
      this.setData(user);
      this._authService.setCurrent(user);
    });
  }
  onError(error: any) {
    this._modalsService.error({
      error: error
    });
  }
  onSaveError(error: any) {
    this.processing = false;
    if (isDevMode()) {
      console.warn('Errors', error);
    }
    if (this._errorsExtractor) {
      const externalErrors = this._errorsExtractor.getValidationErrors(error);
      this.form.setExternalErrorsAsync(externalErrors).then(() => {
        if (!externalErrors) {
          this.onError(error);
        }
      });
    }
  }
}
