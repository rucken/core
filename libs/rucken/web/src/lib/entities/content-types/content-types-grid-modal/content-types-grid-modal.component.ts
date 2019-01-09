import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BaseEntityListModalComponent, ContentType } from '@rucken/core';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';

@Component({
  selector: 'content-types-grid-modal',
  templateUrl: './content-types-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypesGridModalComponent extends BaseEntityListModalComponent<ContentType> {
  @ViewChild('grid')
  grid: ContentTypesGridComponent;
  @Input()
  apiUrl?: string;

  constructor() {
    super();
  }
}
