import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { FontawesomesGridComponent } from '../fontawesomes-grid.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'fontawesomes-list-modal',
  templateUrl: './fontawesomes-list-modal.component.html',
  styleUrls: ['./fontawesomes-list-modal.component.scss']
})

export class FontawesomesListModalComponent extends BaseComponent {

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
  onClose: EventEmitter<FontawesomesListModalComponent>;
  @Input()
  hideOnClose?: boolean;

  @ViewChild('fontawesomes')
  fontawesomes: FontawesomesGridComponent;

  @Input()
  account: any | User;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<FontawesomesListModalComponent>;

  item: any | Fontawesome;
  items: any[] | Fontawesome[];
  modelMeta: any = Fontawesome.meta();

  constructor() {
    super();
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<FontawesomesListModalComponent>();
    this.item = new Fontawesome();
    this.onSave = new EventEmitter<FontawesomesListModalComponent>();
  }

  init() {
    super.init();
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.fontawesomes.focus();
  }

  selectFontawesome(items: any[] | Fontawesome[]) {
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
