import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './../../shared/account.service';
import { AppService } from './../../shared/app.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { translate } from '../../shared/utils';

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
  showEdit?= true;
  @Input()
  showRemove?= true;

  constructor(public translateService: TranslateService) {
    super();
    if (this.editTitle === undefined) {
      this.editTitle = translate('Edit');
    }
    if (this.removeTitle === undefined) {
      this.removeTitle = translate('Remove');
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
