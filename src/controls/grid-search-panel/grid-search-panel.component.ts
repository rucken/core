import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'grid-search-panel',
  templateUrl: './grid-search-panel.component.html',
  styleUrls: ['./grid-search-panel.component.scss']
})

export class GridSearchPanelComponent implements OnInit {
  @Input()
  searchText: string;
  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  searchTitle?: string;
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor(public translateService: TranslateService) {
    if (this.searchTitle === undefined) {
      this.searchTitle = this.translateService.instant('Search');
    }
  }
  ngOnInit() { }
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
