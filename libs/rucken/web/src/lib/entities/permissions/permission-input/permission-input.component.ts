import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Permission, PERMISSIONS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { PermissionsGridModalComponent } from '../permissions-grid-modal/permissions-grid-modal.component';
import { PermissionsGridComponent } from '../permissions-grid/permissions-grid.component';


@Component({
  selector: 'permission-input',
  templateUrl: './permission-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionInputComponent extends PermissionsGridComponent implements OnInit {

  @Output()
  select = new EventEmitter<Permission>();
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: PermissionsGridModalComponent,
    initialState: {
      title: translate('Select permission'),
      yesTitle: translate('Select')
    }
  };

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      permissionsConfig
    );
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.permissionsConfig
    });
    this.mockedItemsChange.subscribe(items =>
      this.onSelect(items[0])
    );
  }
  onSelect(item: Permission) {
    this.select.emit(item);
  }
}
