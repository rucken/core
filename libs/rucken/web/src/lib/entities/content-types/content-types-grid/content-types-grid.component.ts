import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BaseEntityListComponent,
  ContentType,
  CONTENT_TYPES_CONFIG_TOKEN,
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { ContentTypeModalComponent } from '../content-type-modal/content-type-modal.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'content-types-grid',
  templateUrl: './content-types-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypesGridComponent extends BaseEntityListComponent<ContentType> implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: ContentTypeModalComponent
  };
  @Input()
  title = translate('Content types');
  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(CONTENT_TYPES_CONFIG_TOKEN) protected contentTypesConfig: IRestProviderOptions<ContentType>
  ) {
    super(dynamicRepository.fork<ContentType>(ContentType), modalsService, ContentType);
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
