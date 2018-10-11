import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate, User, USERS_CONFIG_TOKEN } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
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
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(USERS_CONFIG_TOKEN) protected usersConfig: IRestProviderOptions<User>
  ) {
    super(dynamicRepository.fork<User>(User), modalService, User);
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
