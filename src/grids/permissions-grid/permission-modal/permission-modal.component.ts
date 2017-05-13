import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { Permission } from './../../../shared/models/permission.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from './../../../shared/account.service';
import { User } from './../../../shared/models/user.model';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss']
})

export class PermissionModalComponent extends BaseComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @Input()
  text = '';
  @Input()
  class = '';
  @Input()
  readonly = false;
  @Input()
  hideOnClose? = true;
  @Input()
  account: any | User = null;
  @Input()
  title = '';
  @Input()
  item: any | Permission = new Permission();
  @Input()
  public modelMeta: any = Permission.meta();
  @Output()
  onClose: EventEmitter<PermissionModalComponent> = new EventEmitter<PermissionModalComponent>();
  @Output()
  onSave: EventEmitter<PermissionModalComponent> = new EventEmitter<PermissionModalComponent>()

  init() {
    super.init()
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }
  save() {
    this.onSave.emit(this);
    return false;
  }
}
