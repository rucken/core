import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Permission, PERMISSIONS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { PermissionModalComponent } from '../permission-modal/permission-modal.component';

@Component({
  selector: 'permissions-grid',
  templateUrl: './permissions-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsGridComponent
  extends BaseEntityListComponent<Permission>
  implements OnInit {
  @Input()
  apiUrl?: string;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(
      dynamicRepository.fork<Permission>(Permission),
      modalService,
      Permission
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.permissionsConfig
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.permissionsConfig
      });
    }
  }
  createDeleteModal(item: Permission): BsModalRef {
    return this.modalService.show(PermissionModalComponent, {
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
    const item = new Permission();
    return this.modalService.show(PermissionModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this.strings.createTitle,
        yesTitle: translate('Create'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createUpdateModal(item?: Permission): BsModalRef {
    return this.modalService.show(PermissionModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this.strings.updateTitle,
        yesTitle: translate('Save'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createViewModal(item?: Permission): BsModalRef {
    return this.modalService.show(PermissionModalComponent, {
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
