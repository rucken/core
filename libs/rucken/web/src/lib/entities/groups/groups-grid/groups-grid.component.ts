import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, GROUPS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
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
    modalItem: IBaseEntityModalOptions = {
        component: GroupModalComponent
    };
    @Input()
    title = translate('Groups');
    constructor(
        public modalService: BsModalService,
        protected errorsExtractor: ErrorsExtractor,
        protected translateService: TranslateService,
        protected dynamicRepository: DynamicRepository,
        protected messageModalService: MessageModalService,
        @Inject(GROUPS_CONFIG_TOKEN) protected groupsConfig: IRestProviderOptions<Group>
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
