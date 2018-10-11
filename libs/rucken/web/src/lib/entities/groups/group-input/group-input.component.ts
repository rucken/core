import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { GroupsGridModalComponent } from '../groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';

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
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(modalService, errorsExtractor, translateService, dynamicRepository, messageModalService, groupsConfig);
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
