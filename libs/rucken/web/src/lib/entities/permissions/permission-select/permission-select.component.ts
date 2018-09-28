import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Permission,
  PERMISSIONS_CONFIG_TOKEN
} from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { PermissionsGridComponent } from '../permissions-grid/permissions-grid.component';

@Component({
  selector: 'permission-select',
  templateUrl: './permission-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionSelectComponent extends PermissionsGridComponent
  implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PERMISSIONS_CONFIG_TOKEN)
    protected permissionsConfig: IRestProviderOptions<Permission>
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
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.permissionsConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.permissionsConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof Permission;
  }
}
