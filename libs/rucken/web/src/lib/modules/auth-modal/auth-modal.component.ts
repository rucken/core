import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthModalComponent, AUTH_MODAL_CONFIG_TOKEN, IAuthModalConfig } from '@rucken/core';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebAuthModalComponent extends AuthModalComponent {
  constructor(@Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig) {
    super(_authModalConfig);
  }
}
