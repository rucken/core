import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ContentType,
  CONTENT_TYPES_CONFIG_TOKEN,
  ErrorsExtractor,
  IBaseEntityModalOptions,
  ModalsService,
  translate
} from '@rucken/core';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { ContentTypesGridModalComponent } from '../content-types-grid-modal/content-types-grid-modal.component';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';

@Component({
  selector: 'content-type-input',
  templateUrl: './content-type-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypeInputComponent extends ContentTypesGridComponent implements OnInit {
  @Output()
  select = new EventEmitter<ContentType>();
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: ContentTypesGridModalComponent,
    initialState: {
      title: translate('Select content type'),
      yesTitle: translate('Select')
    }
  };

  constructor(
    modalsService: ModalsService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    @Inject(CONTENT_TYPES_CONFIG_TOKEN) protected contentTypesConfig: IRestProviderOptions<ContentType>
  ) {
    super(modalsService, errorsExtractor, translateService, dynamicRepository, contentTypesConfig);
  }
  ngOnInit() {
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.contentTypesConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  onSelect(item: ContentType) {
    this.select.emit(item);
  }
}
