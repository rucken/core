import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUP_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { GroupModalComponent } from '../group-modal/group-modal.component';

@Component({
    selector: 'groups-grid',
    templateUrl: './groups-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsGridComponent extends BaseEntityListComponent<Group>
    implements OnInit {
    @Input()
    modalItemComponent = GroupModalComponent;
    @Input()
    title = translate('Groups');
    constructor(
        public modalService: BsModalService,
        protected errorsExtractor: ErrorsExtractor,
        protected translateService: TranslateService,
        protected dynamicRepository: DynamicRepository,
        protected messageModalService: MessageModalService,
        @Inject(GROUP_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
    ) {
        super(dynamicRepository.fork<Group>(Group), modalService, Group);
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
