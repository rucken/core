import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Group,
  IBaseEntityModalOptions,
  ModalsService,
  Permission,
  PERMISSIONS_CONFIG_TOKEN,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { PermissionsGridModalComponent } from '../../permissions/permissions-grid-modal/permissions-grid-modal.component';
import { PermissionsGridComponent } from '../../permissions/permissions-grid/permissions-grid.component';
import { BindIoInner } from 'ngx-bind-io';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@BindIoInner()
@Component({
  selector: 'group-permissions-grid',
  templateUrl: './group-permissions-grid.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupPermissionsGridComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPermissionsGridComponent extends PermissionsGridComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: PermissionsGridModalComponent
  };
  @Input()
  group: Group = undefined;
  @Input()
  strings = {
    ...Permission.strings,
    deleteTtitle: translate('Delete permission'),
    deleteMessage: translate('Do you really want to delete permission "{{title}}" from group?'),
    selectTitle: translate('Select permissions for append to group')
  };
  mockedItemsChangeSubscription: Subscription;

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, permissionsConfig);
  }
  ngOnInit(overrided?: boolean) {
    if (!overrided) {
      return;
    }
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/groups/' + this.group.id,
        autoload: !!this.group.id,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItemsChangeSubscription) {
      this.mockedItemsChangeSubscription.unsubscribe();
    }
    this.mockedItemsChange.subscribe(permissions => this._onChange(permissions));
  }
  ngOnDestroy() {
    if (this.mockedItemsChangeSubscription) {
      this.mockedItemsChangeSubscription.unsubscribe();
    }
  }
  writeValue(permissions: Permission[]): void {
    this.mockedItems = permissions || [];
    this.ngOnInit(true);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  _onChange = (value: Permission) => {};
  _onTouched = () => {};
}
