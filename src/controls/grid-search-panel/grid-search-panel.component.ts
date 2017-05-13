import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'grid-search-panel',
  templateUrl: './grid-search-panel.component.html',
  styleUrls: ['./grid-search-panel.component.scss']
})

export class GridSearchPanelComponent extends BaseComponent {
  @Input()
  public searchText: string;
  @Output()
  public searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public searchTitle?: string;
  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public maxlength = 250;
  constructor(public translateService: TranslateService) {
    super();
    if (this.searchTitle === undefined) {
      this.searchTitle = this.translateService.instant('Search');
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
