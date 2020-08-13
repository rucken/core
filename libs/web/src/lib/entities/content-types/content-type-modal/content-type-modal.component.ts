import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePromptFormModalComponent, ContentType } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
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
