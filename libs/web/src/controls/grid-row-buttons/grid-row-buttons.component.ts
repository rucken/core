import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translate } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'grid-row-buttons',
  templateUrl: './grid-row-buttons.component.html'
})

export class GridRowButtonsComponent extends BaseComponent {
  @Input()
  editTitle?: string;
  @Input()
  removeTitle?: string;
  @Input()
  editIcon = 'fa fa-pencil-square-o';
  @Input()
  removeIcon = 'fa fa-remove';
  @Input()
  editIconColor = ''; // text-primary';
  @Input()
  removeIconColor = ''; // 'text-warning';
  @Output()
  onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  onRemove: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  showEdit?: boolean;
  @Input()
  showRemove?: boolean;

  afterCreate() {
    super.afterCreate();

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
