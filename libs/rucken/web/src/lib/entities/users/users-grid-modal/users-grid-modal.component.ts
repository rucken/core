import {
  Component,
  Input,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseEntityListModalComponent } from '../../../base/base-entity-list-modal.component';
import { UsersGridComponent } from '../users-grid/users-grid.component';

@Component({
  selector: 'users-grid-modal',
  templateUrl: './users-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersGridModalComponent extends BaseEntityListModalComponent<
  User
> {
  @ViewChild('grid')
  grid: UsersGridComponent;
  @Input()
  apiUrl?: string;
  @Input()
  simpleMode = false;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
