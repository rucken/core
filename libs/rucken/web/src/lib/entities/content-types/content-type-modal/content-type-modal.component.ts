import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePromptFormModalComponent, ContentType } from '@rucken/core';

@Component({
  selector: 'content-type-modal',
  templateUrl: './content-type-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTypeModalComponent extends BasePromptFormModalComponent<ContentType> {
  constructor() {
    super();
    this.group(ContentType);
  }
}
