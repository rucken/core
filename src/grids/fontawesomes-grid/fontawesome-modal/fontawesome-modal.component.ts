import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { ModalDirective } from 'ngx-bootstrap';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { BaseResourceModalComponent } from './../../../base/base-resources-grid/base-resource-modal/base-resource-modal.component';

@Component({
  selector: 'fontawesome-modal',
  templateUrl: './fontawesome-modal.component.html',
  styleUrls: ['./fontawesome-modal.component.scss']
})

export class FontawesomeModalComponent extends BaseResourceModalComponent {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;

  @Input()
  item: any | Fontawesome = new Fontawesome();
  @Input()
  modelMeta: any = Fontawesome.meta();
  @Output()
  onClose: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();
  @Output()
  onOk: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();
}
