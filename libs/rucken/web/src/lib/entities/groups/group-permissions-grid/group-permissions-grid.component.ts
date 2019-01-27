import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Group,
  IBaseEntityModalOptions,
  ModalsService,
  Permission,
  PERMISSIONS_CONFIG_TOKEN,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { PermissionsGridModalComponent } from '../../permissions/permissions-grid-modal/permissions-grid-modal.component';
import { PermissionsGridComponent } from '../../permissions/permissions-grid/permissions-grid.component';

@Component({
  selector: 'group-permissions-grid',
  templateUrl: './group-permissions-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPermissionsGridComponent extends PermissionsGridComponent implements OnInit {
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: PermissionsGridModalComponent
  };
  @Input()
  group: Group = undefined;
  @Input()
  strings = {
    ...Permission.strings,
    deleteTtitle: translate('Delete permission'),
    deleteMessage: translate('Do you really want to delete permission "{{title}}" from group?'),
    selectTitle: translate('Select permissions for append to group')
  };

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, permissionsConfig);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/groups/' + this.group.id,
        autoload: !!this.group.id,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return action !== ProviderActionEnum.Create && action !== ProviderActionEnum.Delete;
        }
      });
    }
  }
}
