import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GroupsConfig, User, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, ProviderActionEnum } from 'ngx-repository';
import { GroupModalComponent } from '../../group/group-modal/group-modal.component';
import { GroupsGridModalComponent } from '../../group/groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../../group/groups-grid/groups-grid.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';

@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGroupsGridComponent extends GroupsGridComponent implements OnInit {

  @Input()
  user: User;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected groupsConfig: GroupsConfig,
    protected messageModalService: MessageModalService
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      groupsConfig,
      messageModalService
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.repository.useRest({
        apiUrl: this.apiUrl + '/users/' + this.user.id,
        autoload: !!this.user.id,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItems) {
      this.repository.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.groupsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
  }
  createDeleteModal(item: Group): BsModalRef {
    return this.modalService.show(GroupModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Delete group'),
        message: translate('Do you really want to delete group "{{title}}" from user?'),
        yesTitle: translate('Delete'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createAppendFromGridModal(): BsModalRef {
    return this.modalService.show(GroupsGridModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Select groups for append to user'),
        yesTitle: translate('Append'),
        apiUrl: this.apiUrl
      }
    });
  }
}
