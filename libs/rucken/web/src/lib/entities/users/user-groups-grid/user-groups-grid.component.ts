import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Group,
  GROUPS_CONFIG_TOKEN,
  translate,
  User
} from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  DynamicRepository,
  IRestProviderOptions,
  ProviderActionEnum
} from 'ngx-repository';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { GroupsGridModalComponent } from '../../groups/groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../../groups/groups-grid/groups-grid.component';

@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGroupsGridComponent extends GroupsGridComponent
  implements OnInit {
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: GroupsGridModalComponent
  };
  @Input()
  user: User;
  @Input()
  strings = {
    ...Group.strings,
    deleteTitle: translate('Delete group'),
    deleteMessage: translate(
      'Do you really want to delete group "{{title}}" from user?'
    ),
    selectTitle: translate('Select groups for append to user')
  };

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(GROUPS_CONFIG_TOKEN)
    protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      groupsConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/users/' + this.user.id,
        autoload: !!this.user.id,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
  }
}
