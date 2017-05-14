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
import { BaseResourceModalComponent } from './../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';

@Component({
  selector: 'permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss']
})

export class PermissionModalComponent extends BaseResourceModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @Input()
  item: any | Permission = new Permission();
  @Input()
  modelMeta: any = Permission.meta();
  @Output()
  onClose: EventEmitter<PermissionModalComponent> = new EventEmitter<PermissionModalComponent>();
  @Output()
  onSave: EventEmitter<PermissionModalComponent> = new EventEmitter<PermissionModalComponent>()
}
