import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Permission } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'permission-modal',
  templateUrl: './permission-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionModalComponent extends BasePromptFormModalComponent<Permission> {
  @Input()
  apiUrl?: string = undefined;

  constructor() {
    super();
    this.group(Permission);
  }
}
