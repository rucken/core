import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { User } from '././../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { ContentTypesGridComponent } from './../content-types-grid.component';
import { BaseResourceListModalComponent } from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';

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
