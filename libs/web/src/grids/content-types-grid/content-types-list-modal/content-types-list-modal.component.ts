import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ContentType } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  BaseResourceListModalComponent,
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { ContentTypesGridComponent } from './../content-types-grid.component';

@Component({
  selector: 'content-types-list-modal',
  templateUrl: './content-types-list-modal.component.html',
  styleUrls: ['./content-types-list-modal.component.scss']
})

export class ContentTypesListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ContentTypesGridComponent;
  @ViewChild('contentTypes')
  contentTypes: ContentTypesGridComponent;

  @Output()
  onClose: EventEmitter<ContentTypesListModalComponent> = new EventEmitter<ContentTypesListModalComponent>();
  @Output()
  onOk: EventEmitter<ContentTypesListModalComponent> = new EventEmitter<ContentTypesListModalComponent>();

  item: any | ContentType = new ContentType();
  items: any[] | ContentType[] = [];
  modelMeta: any = ContentType.meta();

  selectContentType(items: any[] | ContentType[]) {
    this.item = items[0];
    this.items = items;
  }
}
