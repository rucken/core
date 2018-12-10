import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { BasePromptModalComponent } from '@rucken/core';

@Component({
  selector: 'prompt-form-modal',
  templateUrl: './prompt-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptFormModalComponent extends BasePromptModalComponent {
  @Input()
  footerButtonsTemplate: TemplateRef<any>;
  @Input()
  leftFooterButtonsTemplate: TemplateRef<any>;
  @Input()
  readonlyFooterButtonsTemplate: TemplateRef<any>;
  @Input()
  headerTemplate: TemplateRef<any>;
  constructor() {
    super();
  }
}
