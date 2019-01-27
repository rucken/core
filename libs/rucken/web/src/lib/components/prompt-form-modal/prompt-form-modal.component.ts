import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { BasePromptModalComponent } from '@rucken/core';

@Component({
  selector: 'prompt-form-modal',
  templateUrl: './prompt-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptFormModalComponent extends BasePromptModalComponent {
  @Input()
  footerButtonsTemplate: TemplateRef<any> = undefined;
  @Input()
  leftFooterButtonsTemplate: TemplateRef<any> = undefined;
  @Input()
  readonlyFooterButtonsTemplate: TemplateRef<any> = undefined;
  @Input()
  headerTemplate: TemplateRef<any> = undefined;
  constructor() {
    super();
  }
}
