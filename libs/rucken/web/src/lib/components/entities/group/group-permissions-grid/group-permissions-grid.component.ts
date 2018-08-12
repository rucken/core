import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Group,
  Permission,
  PermissionsConfig,
  translate
} from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, ProviderActionEnum } from 'ngx-repository';
import { PermissionModalComponent } from '../../permission/permission-modal/permission-modal.component';
import { PermissionsGridModalComponent } from '../../permission/permissions-grid-modal/permissions-grid-modal.component';
import { PermissionsGridComponent } from '../../permission/permissions-grid/permissions-grid.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';

@Component({
  selector: 'group-permissions-grid',
  templateUrl: './group-permissions-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPermissionsGridComponent extends PermissionsGridComponent
  implements OnInit {
  @Input()
  group: Group;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected permissionsConfig: PermissionsConfig,
    protected messageModalService: MessageModalService
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      permissionsConfig,
      messageModalService
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.repository.useRest({
        apiUrl: this.apiUrl + '/groups/' + this.group.id,
        autoload: !!this.group.id,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
    if (this.mockedItems) {
      this.repository.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
  }
  createDeleteModal(item: Permission): BsModalRef {
    return this.modalService.show(PermissionModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Delete permission'),
        message: translate(
          'Do you really want to delete permission "{{title}}" from group?'
        ),
        yesTitle: translate('Delete'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createAppendFromGridModal(): BsModalRef {
    return this.modalService.show(PermissionsGridModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Select permissions for append to group'),
        yesTitle: translate('Append'),
        apiUrl: this.apiUrl
      }
    });
  }
}
