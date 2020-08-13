import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasePromptModalComponent } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'entity-grid-modal',
  templateUrl: './entity-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityGridModalComponent extends BasePromptModalComponent {
  @Input()
  yesClass = 'btn btn-success';

  constructor() {
    super();
  }
}
