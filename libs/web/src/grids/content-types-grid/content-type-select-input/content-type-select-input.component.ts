import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ContentTypesService, translate } from '@rucken/core';
import { ContentType } from '@rucken/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

import {
  BaseResourceSelectInputComponent,
} from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { ContentTypesListModalComponent } from './../content-types-list-modal/content-types-list-modal.component';

@Component({
  selector: 'content-type-select-input',
  templateUrl: './content-type-select-input.component.html',
  styleUrls: ['./content-type-select-input.component.scss'],
  entryComponents: [ContentTypesListModalComponent]
})

export class ContentTypeSelectInputComponent extends BaseResourceSelectInputComponent {

  @ViewChild('inputElement')
  inputElement: any;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  name = 'contentType';
  @Input()
  model: any | ContentType = new ContentType();
  @Output()
  modelChange: EventEmitter<any | ContentType> = new EventEmitter<any | ContentType>();

  items: any[] | ContentType[];
  cachedResourcesService: ContentTypesService;

  contentTypesService: ContentTypesService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.contentTypesService = injector.get(ContentTypesService);
    this.cachedResourcesService = this.contentTypesService.createCache();
  }
  changeInputValue(value: string) {
    const filter: any = {};
    if (this.cachedResourcesService) {
      this.cachedResourcesService.ignoreCache = true;
      this.cachedResourcesService.loadAll(value, filter);
    }
  }
  onLookup() {
    const itemModal: ContentTypesListModalComponent =
      this.app.modals(this.resolver).create(ContentTypesListModalComponent);
    itemModal.name = 'selectContentTypes';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.okTitle = translate('Select');
    itemModal.title = translate('Content types');
    itemModal.onOk.subscribe(($event: any) => {
      this.value = itemModal.item;
      if (this.inputElement) {
        this.inputElement.value = this.value ? this.value.pk : null;
      }
      if (this.inputReadonly === false) {
        this.valueAsString = '';
      }
      itemModal.modal.hide();
    });
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = this.value;
    itemModal.modal.show();
  }
  get statusListMessage() {
    return '';
  }
}



// WEBPACK FOOTER //
// C:/Projects/open-sources/@rucken/core/libs/web/src/grids/content-types-grid/content-type-select-input/content-type-select-input.component.ts
