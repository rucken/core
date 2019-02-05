import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BaseEntityListModalComponent, User } from '@rucken/core';
import { UsersGridComponent } from '../users-grid/users-grid.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'users-grid-modal',
  templateUrl: './users-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersGridModalComponent extends BaseEntityListModalComponent<User> {
  @ViewChild('grid')
  grid: UsersGridComponent;
  @Input()
  apiUrl?: string = undefined;
  @Input()
  simpleMode = false;

  constructor() {
    super();
  }
}
