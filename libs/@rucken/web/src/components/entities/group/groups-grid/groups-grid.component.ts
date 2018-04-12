import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GroupsConfig, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, PaginationMeta } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { GroupModalComponent } from '../group-modal/group-modal.component';


@Component({
  selector: 'groups-grid',
  templateUrl: './groups-grid.component.html'
})
export class GroupsGridComponent extends BaseEntityListComponent<Group> implements OnInit {

  public paginationMeta: PaginationMeta;
  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected groupsConfig: GroupsConfig
  ) {
    super(
      dynamicRepository.fork<Group>(Group),
      modalService,
      Group
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.repository.useRest({
        apiUrl: this.apiUrl,
        ...this.groupsConfig
      });
    }
    if (this.mockedItems) {
      this.repository.useMock({
        items: this.mockedItems,
        ...this.groupsConfig
      });
    }
  }
  createDeleteModal(item: Group): BsModalRef {
    return this.modalService.show(GroupModalComponent, {
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
    const item = new Group();
    return this.modalService.show(GroupModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this.strings.createTitle,
        yesTitle: translate('Create'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createUpdateModal(item?: Group): BsModalRef {
    return this.modalService.show(GroupModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this.strings.updateTitle,
        yesTitle: translate('Save'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createViewModal(item?: Group): BsModalRef {
    return this.modalService.show(GroupModalComponent, {
      class: 'modal-md',
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
