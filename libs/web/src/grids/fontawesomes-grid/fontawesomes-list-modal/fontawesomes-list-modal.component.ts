import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Fontawesome } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  BaseResourceListModalComponent,
} from './../../../base/base-resources-grid/base-resources-list-modal/base-resources-list-modal.component';
import { FontawesomesGridComponent } from './../fontawesomes-grid.component';

@Component({
  selector: 'fontawesomes-list-modal',
  templateUrl: './fontawesomes-list-modal.component.html'
})

export class FontawesomesListModalComponent extends BaseResourceListModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @ViewChild('fontawesomes')
  fontawesomes: FontawesomesGridComponent;

  @Output()
  onClose: EventEmitter<FontawesomesListModalComponent> = new EventEmitter<FontawesomesListModalComponent>();
  @Output()
  onOk: EventEmitter<FontawesomesListModalComponent> = new EventEmitter<FontawesomesListModalComponent>();

  item: any | Fontawesome = new Fontawesome();
  items: any[] | Fontawesome[] = [];
  modelMeta: any = Fontawesome.meta();

  selectFontawesome(items: any[] | Fontawesome[]) {
    this.item = items[0];
    this.items = items;
  }
}
