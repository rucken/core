import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ContentType,
  CONTENT_TYPES_CONFIG_TOKEN,
  ErrorsExtractor,
  translate
} from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { BaseEntityListComponent } from '../../../base/base-entity-list.component';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { ContentTypeModalComponent } from '../content-type-modal/content-type-modal.component';
import { IBaseEntityModalOptions } from '../../../base/base-entity-modals.interface';

@Component({
  selector: 'content-types-grid',
  templateUrl: './content-types-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypesGridComponent
  extends BaseEntityListComponent<ContentType>
  implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: ContentTypeModalComponent
  };
  @Input()
  title = translate('Content types');
  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(CONTENT_TYPES_CONFIG_TOKEN)
    protected contentTypesConfig: IRestProviderOptions<ContentType>
  ) {
    super(
      dynamicRepository.fork<ContentType>(ContentType),
      modalService,
      ContentType
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.contentTypesConfig
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.contentTypesConfig
      });
    }
  }
}
