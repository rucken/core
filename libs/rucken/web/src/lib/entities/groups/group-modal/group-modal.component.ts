import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptFormModalComponent, Group } from '@rucken/core';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupModalComponent extends BasePromptFormModalComponent<Group> {
  @Input()
  apiUrl?: string = undefined;

  constructor() {
    super();
    this.group(Group);
  }
}
