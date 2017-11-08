import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translate } from '@rucken/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'grid-search-panel',
  templateUrl: './grid-search-panel.component.html',
  styleUrls: ['./grid-search-panel.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class GridSearchPanelComponent extends BaseComponent {
  @Input()
  searchText: string;
  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  searchTitle?: string;
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  maxlength = 250;

  afterCreate() {
    if (this.searchTitle === undefined) {
      this.searchTitle = translate('Search');
    }
  }
  get searchTextValue() {
    return this.searchText;
  }
  set searchTextValue(val) {
    this.searchText = val;
    this.searchTextChange.emit(this.searchText);
  }
  search() {
    this.onSearch.emit(this.searchText);
  }
}
