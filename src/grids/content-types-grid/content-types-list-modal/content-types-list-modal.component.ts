import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { User } from '././../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { ContentTypesGridComponent } from '../content-types-grid.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'content-types-list-modal',
  templateUrl: './content-types-list-modal.component.html',
  styleUrls: ['./content-types-list-modal.component.scss']
})

export class ContentTypesListModalComponent extends BaseComponent {

  @Input()
  text: string;
  @Input()
  class: string;
  @Input()
  readonly: boolean;
  @Input()
  hardReadonly = false;
  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Output()
  onClose: EventEmitter<ContentTypesListModalComponent>;
  @Input()
  hideOnClose?: boolean;

  @ViewChild('contentTypes')
  contentTypes: ContentTypesGridComponent;

  @Input()
  account: any | User;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<ContentTypesListModalComponent>;

  item: any | ContentType;
  items: any[] | ContentType[];
  modelMeta: any = ContentType.meta();

  constructor() {
    super();
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<ContentTypesListModalComponent>();
    this.item = new ContentType();
    this.onSave = new EventEmitter<ContentTypesListModalComponent>();
  }
  init() {
    super.init();
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.contentTypes.focus();
  }

  selectContentType(items: any[] | ContentType[]) {
    this.item = items[0];
    this.items = items;
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }

  select() {
    this.onSave.emit(this);
    return false;
  }
}
