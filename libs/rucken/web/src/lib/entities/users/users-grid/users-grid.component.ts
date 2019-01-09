import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BaseEntityListComponent,
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  translate,
  User,
  USERS_CONFIG_TOKEN
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersGridComponent extends BaseEntityListComponent<User> implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: UserModalComponent
  };
  @Input()
  simpleMode = false;
  @Input()
  title = translate('Users');
  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(USERS_CONFIG_TOKEN) protected usersConfig: IRestProviderOptions<User>
  ) {
    super(dynamicRepository.fork<User>(User), modalsService, User);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.usersConfig
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.usersConfig
      });
    }
    this.modalItem = {
      ...this.modalItem,
      class: this.simpleMode ? 'modal-md' : 'modal-lg',
      initialState: {
        ...this.modalItem.initialState,
        simpleMode: this.simpleMode
      }
    };
  }
}
