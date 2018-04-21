import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, User, UsersConfig, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, PaginationMeta } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { UserModalComponent } from '../user-modal/user-modal.component';


@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html'
})
export class UsersGridComponent extends BaseEntityListComponent<User> implements OnInit {

  public paginationMeta: PaginationMeta;
  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected usersConfig: UsersConfig,
    protected messageModalService: MessageModalService
  ) {
    super(
      dynamicRepository.fork<User>(User),
      modalService,
      User
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.repository.useRest({
        apiUrl: this.apiUrl,
        ...this.usersConfig
      });
    }
    if (this.mockedItems) {
      this.repository.useMock({
        items: this.mockedItems,
        ...this.usersConfig
      });
    }
  }
  createDeleteModal(item: User): BsModalRef {
    return this.modalService.show(UserModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this.strings.deleteTitle,
        message: this.strings.deleteMessage,
        yesTitle: translate('Delete'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createCreateModal(): BsModalRef {
    const item = new User();
    return this.modalService.show(UserModalComponent, {
      class: 'modal-lg',
      initialState: {
        title: this.strings.createTitle,
        yesTitle: translate('Create'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createUpdateModal(item?: User): BsModalRef {
    return this.modalService.show(UserModalComponent, {
      class: 'modal-lg',
      initialState: {
        title: this.strings.updateTitle,
        yesTitle: translate('Save'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createViewModal(item?: User): BsModalRef {
    return this.modalService.show(UserModalComponent, {
      class: 'modal-lg',
      initialState: {
        title: this.strings.viewTitle,
        noTitle: translate('Close'),
        readonly: true,
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
}
