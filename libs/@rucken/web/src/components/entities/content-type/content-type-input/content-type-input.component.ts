import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentType, ContentTypesConfig, ErrorsExtractor, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository } from 'ngx-repository';
import { ContentTypesGridModalComponent } from '../content-types-grid-modal/content-types-grid-modal.component';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';


@Component({
  selector: 'content-type-input',
  templateUrl: './content-type-input.component.html'
})
export class ContentTypeInputComponent extends ContentTypesGridComponent implements OnInit {

  @Output()
  select = new EventEmitter<ContentType>();

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected contentTypesConfig: ContentTypesConfig
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      contentTypesConfig
    );
  }
  ngOnInit() {
    this.mockedItems = [];
    this.repository.useMock({
      items: this.mockedItems,
      ...this.contentTypesConfig
    });
    this.mockedItemsChange.subscribe(items =>
      this.onSelect(items[0])
    );
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
