import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { ContentType } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseEntityListModalComponent } from '../../../base/base-entity-list-modal.component';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';

@Component({
  selector: 'content-types-grid-modal',
  templateUrl: './content-types-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypesGridModalComponent extends BaseEntityListModalComponent<
  ContentType
> {
  @ViewChild('grid')
  grid: ContentTypesGridComponent;
  @Input()
  apiUrl?: string;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
