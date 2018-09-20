import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { GroupsGridModalComponent } from '../groups-grid-modal/groups-grid-modal.component';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';


@Component({
  selector: 'group-input',
  templateUrl: './group-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupInputComponent extends GroupsGridComponent implements OnInit {

  @Output()
  select = new EventEmitter<Group>();

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      groupsConfig
    );
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.groupsConfig
    });
    this.mockedItemsChange.subscribe(items =>
      this.onSelect(items[0])
    );
  }
  createAppendFromGridModal(): BsModalRef {
    return this.modalService.show(GroupsGridModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Select group'),
        yesTitle: translate('Select'),
        apiUrl: this.apiUrl
      }
    });
  }
  onSelect(item: Group) {
    this.select.emit(item);
  }
}
