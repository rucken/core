import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { BaseResourceModalComponent } from './../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';

@Component({
  selector: 'content-type-modal',
  templateUrl: './content-type-modal.component.html',
  styleUrls: ['./content-type-modal.component.scss']
})

export class ContentTypeModalComponent extends BaseResourceModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;

  @Input()
  item: any | ContentType = new ContentType();
  @Input()
  modelMeta: any = ContentType.meta();
  @Output()
  onClose: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();
  @Output()
  onOk: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();
}
