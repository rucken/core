import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ErrorsExtractor,
  Group,
  GROUPS_CONFIG_TOKEN,
  IBaseEntityModalOptions,
  translate,
  ModalsService
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { GroupsGridModalComponent } from '../groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'group-input',
  templateUrl: './group-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupInputComponent extends GroupsGridComponent implements OnInit {
  @Output()
  select = new EventEmitter<Group>();
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: GroupsGridModalComponent,
    initialState: {
      title: translate('Select group'),
      yesTitle: translate('Select')
    }
  };

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, groupsConfig);
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.groupsConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  onSelect(item: Group) {
    this.select.emit(item);
  }
}
