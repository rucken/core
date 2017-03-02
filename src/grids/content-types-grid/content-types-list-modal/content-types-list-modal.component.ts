import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { User } from '././../../../shared/models/user.model';
import { ModalDirective } from 'ng2-bootstrap';
import { ContentTypesGridComponent } from '../content-types-grid.component';

@Component({
  selector: 'content-types-list-modal',
  templateUrl: './content-types-list-modal.component.html',
  styleUrls: ['./content-types-list-modal.component.scss']
})

export class ContentTypesListModalComponent implements OnInit {

  @Input()
  text: string;
  @Input()
  class: string;
  @Input()
  readonly: boolean;
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
  items: ContentType[];
  modelMeta: any = ContentType.meta;

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<ContentTypesListModalComponent>();
    this.item = new ContentType();
    this.onSave = new EventEmitter<ContentTypesListModalComponent>();
  }

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.contentTypes.focus();
  }

  selectContentType(items: ContentType[]) {
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
