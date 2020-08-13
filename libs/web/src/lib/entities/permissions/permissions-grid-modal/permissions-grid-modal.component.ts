import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BaseEntityListModalComponent, Permission } from '@rucken/core';
import { PermissionsGridComponent } from '../permissions-grid/permissions-grid.component';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'permissions-grid-modal',
  templateUrl: './permissions-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsGridModalComponent extends BaseEntityListModalComponent<Permission> {
  @ViewChild('grid')
  grid: PermissionsGridComponent;
  @Input()
  apiUrl?: string = undefined;

  constructor() {
    super();
  }
}
