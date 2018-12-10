import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  Permission,
  PERMISSIONS_CONFIG_TOKEN,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
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
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, permissionsConfig);
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.permissionsConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  onSelect(item: Permission) {
    this.select.emit(item);
  }
}
