import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { User } from './../../../shared/models/user.model';
import { ModalDirective } from 'ngx-bootstrap';
import { FontawesomesGridComponent } from '../fontawesomes-grid.component';
import { BaseResourceListModalComponent } from '../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';

@Component({
  selector: 'fontawesomes-list-modal',
  templateUrl: './fontawesomes-list-modal.component.html',
  styleUrls: ['./fontawesomes-list-modal.component.scss']
})

export class FontawesomesListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Output()
  onClose: EventEmitter<FontawesomesListModalComponent> = new EventEmitter<FontawesomesListModalComponent>();
  @ViewChild('fontawesomes')
  fontawesomes: FontawesomesGridComponent;
  @Output()
  onSave: EventEmitter<FontawesomesListModalComponent> = new EventEmitter<FontawesomesListModalComponent>();

  item: any | Fontawesome = new Fontawesome();
  items: any[] | Fontawesome[] = [];
  modelMeta: any = Fontawesome.meta();

  focus() {
    this.fontawesomes.focus();
  }

  selectFontawesome(items: any[] | Fontawesome[]) {
    this.item = items[0];
    this.items = items;
  }
}
