import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN, IBaseEntityModalOptions, ModalsService, translate, User } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { Subscription } from 'rxjs';
import { GroupsGridModalComponent } from '../../groups/groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../../groups/groups-grid/groups-grid.component';

@BindIoInner()
@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserGroupsGridComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGroupsGridComponent extends GroupsGridComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: GroupsGridModalComponent
  };
  @Input()
  user: User = undefined;
  @Input()
  strings = {
    ...Group.strings,
    deleteTitle: translate('Delete group'),
    deleteMessage: translate('Do you really want to delete group "{{title}}" from user?'),
    selectTitle: translate('Select groups for append to user')
  };
  mockedItemsChangeSubscription: Subscription;

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, groupsConfig);
  }
  ngOnInit(overrided?: boolean) {
    if (!overrided) {
      return;
    }
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/users/' + this.user.id,
        autoload: !!this.user.id,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItemsChangeSubscription) {
      this.mockedItemsChangeSubscription.unsubscribe();
    }
    this.mockedItemsChange.subscribe(groups => this._onChange(groups));
  }
  ngOnDestroy() {
    if (this.mockedItemsChangeSubscription) {
      this.mockedItemsChangeSubscription.unsubscribe();
    }
  }
  writeValue(groups: Group[]): void {
    this.mockedItems = groups || [];
    this.ngOnInit(true);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
  _onChange = (value: Group) => { };
  _onTouched = () => { };
}
