import { Injectable } from '@angular/core';

@Injectable()
export class TableColumnConfig {
  onlyOneSortColumn = true;
  unsortedIcon = 'fa fa-sort';
  sortedByAsc = 'fa fa-sort-amount-asc';
  sortedByDesc = 'fa fa-sort-amount-desc';
}
