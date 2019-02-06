import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthModalComponent, AUTH_MODAL_CONFIG_TOKEN, IAuthModalConfig } from '@rucken/core';
import { BindIoInner, NgxBindIoService } from 'ngx-bind-io';
import { PromptFormModalComponent } from '../../components/prompt-form-modal/prompt-form-modal.component';

@BindIoInner()
@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebAuthModalComponent extends AuthModalComponent implements OnInit {
  @ViewChild('promptFormModal')
  promptFormModal: PromptFormModalComponent;
  constructor(
    @Inject(AUTH_MODAL_CONFIG_TOKEN) private _authModalConfig: IAuthModalConfig,
    private _ngxBindIoService: NgxBindIoService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_authModalConfig);
  }
  ngOnInit() {
    super.ngOnInit();
    this._ngxBindIoService.linkHostToInner(
      this,
      this.promptFormModal,
      undefined,
      this._changeDetectorRef
    );
  }
}
