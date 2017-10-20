import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translate } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'grid-row-buttons',
  templateUrl: './grid-row-buttons.component.html',
  styleUrls: ['./grid-row-buttons.component.scss']
})

export class GridRowButtonsComponent extends BaseComponent {
  @Input()
  editTitle?: string;
  @Input()
  removeTitle?: string;
  @Input()
  editIcon?= 'fa fa-pencil-square-o';
  @Input()
  removeIcon?= 'fa fa-remove';
  @Input()
  editIconColor?= ''; // text-primary';
  @Input()
  removeIconColor?= ''; // 'text-warning';
  @Output()
  onEdit: EventEmitter<boolean | any> = new EventEmitter();
  @Output()
  onRemove: EventEmitter<boolean | any> = new EventEmitter();
  @Input()
  showEdit?: boolean;
  @Input()
  showRemove?: boolean;

  constructor(public translateService: TranslateService) {
    super();
  }
  afterCreate() {
    if (this.editTitle === undefined) {
      this.editTitle = translate('Edit');
    }
    if (this.removeTitle === undefined) {
      this.removeTitle = translate('Remove');
    }
    if (this.showEdit === undefined) {
      this.showEdit = true;
    }
    if (this.showRemove === undefined) {
      this.showRemove = true;
    }
  }
  edit() {
    this.onEdit.emit(true);
    return false;
  }
  remove() {
    this.onRemove.emit(true);
    return false;
  }
}
