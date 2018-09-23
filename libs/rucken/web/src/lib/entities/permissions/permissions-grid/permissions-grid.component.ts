import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Permission, PERMISSIONS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { PermissionModalComponent } from '../permission-modal/permission-modal.component';

@Component({
    selector: 'permissions-grid',
    templateUrl: './permissions-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsGridComponent
    extends BaseEntityListComponent<Permission>
    implements OnInit {
    @Input()
    modalItem: IBaseEntityModalOptions = {
        component: PermissionModalComponent
    };
    @Input()
    title = translate('Permissions');
    @Input()
    apiUrl?: string;

    constructor(
        public modalService: BsModalService,
        protected errorsExtractor: ErrorsExtractor,
        protected translateService: TranslateService,
        protected dynamicRepository: DynamicRepository,
        protected messageModalService: MessageModalService,
        @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
    ) {
        super(
            dynamicRepository.fork<Permission>(Permission),
            modalService,
            Permission
        );
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
