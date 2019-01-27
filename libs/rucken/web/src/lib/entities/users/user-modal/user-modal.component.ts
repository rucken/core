import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, User } from '@rucken/core';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent extends BasePromptFormModalComponent<User> {
  @Input()
  apiUrl?: string = undefined;
  @Input()
  simpleMode: boolean = undefined;

  constructor() {
    super();
    this.group(User);
  }
}
