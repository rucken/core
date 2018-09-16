import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ContentType, CONTENT_TYPES_CONFIG_TOKEN, ErrorsExtractor } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';

@Component({
  selector: 'content-type-select',
  templateUrl: './content-type-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypeSelectComponent extends ContentTypesGridComponent
  implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(CONTENT_TYPES_CONFIG_TOKEN) protected contentTypesConfig: IRestProviderOptions<ContentType>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      contentTypesConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.contentTypesConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.contentTypesConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof ContentType;
  }
}
