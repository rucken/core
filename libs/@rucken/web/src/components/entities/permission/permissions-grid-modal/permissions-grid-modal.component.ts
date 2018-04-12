import { Component, Input, ViewChild } from '@angular/core';
import { Permission } from '@rucken/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseEntityListModalComponent } from '../../../base/base-entity-list-modal.component';
import { PermissionsGridComponent } from '../permissions-grid/permissions-grid.component';

@Component({
  selector: 'permissions-grid-modal',
  templateUrl: './permissions-grid-modal.component.html'
})
export class PermissionsGridModalComponent extends BaseEntityListModalComponent<Permission> {

  @ViewChild('grid')
  grid: PermissionsGridComponent;
  @Input()
  apiUrl?: string;

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
  }
}
