import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  translate,
  User,
  USERS_CONFIG_TOKEN
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { UsersGridModalComponent } from '../users-grid-modal/users-grid-modal.component';
import { UsersGridComponent } from '../users-grid/users-grid.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputComponent extends UsersGridComponent implements OnInit {
  @Output()
  select = new EventEmitter<User>();
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: UsersGridModalComponent,
    initialState: {
      title: translate('Select user'),
      yesTitle: translate('Select'),
      simpleMode: this.simpleMode
    }
  };

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(USERS_CONFIG_TOKEN) protected usersConfig: IRestProviderOptions<User>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, usersConfig);
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.usersConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  onSelect(item: User) {
    this.select.emit(item);
  }
}
