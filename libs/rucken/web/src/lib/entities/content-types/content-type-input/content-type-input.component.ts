import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentType, CONTENT_TYPES_CONFIG_TOKEN, ErrorsExtractor, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { ContentTypesGridModalComponent } from '../content-types-grid-modal/content-types-grid-modal.component';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';

@Component({
  selector: 'content-type-input',
  templateUrl: './content-type-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypeInputComponent extends ContentTypesGridComponent
  implements OnInit {
  @Output()
  select = new EventEmitter<ContentType>();

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
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.contentTypesConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  createAppendFromGridModal(): BsModalRef {
    return this.modalService.show(ContentTypesGridModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Select content type'),
        yesTitle: translate('Select'),
        apiUrl: this.apiUrl
      }
    });
  }
  onSelect(item: ContentType) {
    this.select.emit(item);
  }
}
