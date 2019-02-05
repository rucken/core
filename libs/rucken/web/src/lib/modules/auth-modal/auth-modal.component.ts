import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AuthModalComponent, AUTH_MODAL_CONFIG_TOKEN, IAuthModalConfig } from '@rucken/core';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebAuthModalComponent extends AuthModalComponent implements OnInit {
  constructor(
    @Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig
  ) {
    super(_authModalConfig);
  }
}
