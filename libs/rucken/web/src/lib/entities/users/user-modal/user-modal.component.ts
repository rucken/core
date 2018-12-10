import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group, User } from '@rucken/core';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent extends BasePromptFormModalComponent<User> {
  @Input()
  apiUrl?: string;
  @Input()
  simpleMode: boolean;

  constructor() {
    super();
    this.group(User);
  }
  onGroupsChange(groups: Group[]) {
    // todo: remove after ngx-dynamic-form-builder updated with correct work with arrays
    const data: User = this.data;
    data.groups = groups;
    this.data = data;
  }
}
