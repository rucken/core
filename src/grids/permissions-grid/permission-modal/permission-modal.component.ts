import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Permission } from '@rucken/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
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
  onOk: EventEmitter<PermissionModalComponent> = new EventEmitter<PermissionModalComponent>()
}
