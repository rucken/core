import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { GroupsGridComponent } from '../groups-grid/groups-grid.component';


@Component({
  selector: 'group-select',
  templateUrl: './group-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupSelectComponent extends GroupsGridComponent implements OnInit {

  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

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
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.groupsConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.groupsConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof Group;
  }
}
