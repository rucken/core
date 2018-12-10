import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BaseEntityListComponent,
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  Permission,
  PERMISSIONS_CONFIG_TOKEN,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { PermissionModalComponent } from '../permission-modal/permission-modal.component';

@Component({
  selector: 'permissions-grid',
  templateUrl: './permissions-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsGridComponent extends BaseEntityListComponent<Permission> implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: PermissionModalComponent
  };
  @Input()
  title = translate('Permissions');
  @Input()
  apiUrl?: string;

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(dynamicRepository.fork<Permission>(Permission), modalsService, Permission);
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
}
