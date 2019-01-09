import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BaseEntityListComponent,
  ErrorsExtractor,
  Group,
  GROUPS_CONFIG_TOKEN,
  IBaseEntityModalOptions,
  ModalsService,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { GroupModalComponent } from '../group-modal/group-modal.component';

@Component({
  selector: 'groups-grid',
  templateUrl: './groups-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsGridComponent extends BaseEntityListComponent<Group> implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: GroupModalComponent
  };
  @Input()
  title = translate('Groups');
  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(dynamicRepository.fork<Group>(Group), modalsService, Group);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.groupsConfig
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.groupsConfig
      });
    }
  }
}
