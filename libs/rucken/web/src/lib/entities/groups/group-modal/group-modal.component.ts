import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group, Permission } from '@rucken/core';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupModalComponent extends BasePromptFormModalComponent<Group> {
  @Input()
  apiUrl?: string;

  constructor() {
    super();
    this.group(Group);
  }
  onPermissionsChange(permissions: Permission[]) {
    // todo: remove after ngx-dynamic-form-builder updated with correct work with arrays
    const data: Group = this.data;
    data.permissions = permissions;
    this.data = data;
  }
}
