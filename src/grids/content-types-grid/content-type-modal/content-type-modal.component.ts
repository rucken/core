import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from './../../../shared/account.service';
import { User } from './../../../shared/models/user.model';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'content-type-modal',
  templateUrl: './content-type-modal.component.html',
  styleUrls: ['./content-type-modal.component.scss']
})

export class ContentTypeModalComponent extends BaseComponent {

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
  item: any | ContentType = new ContentType();
  @Input()
  modelMeta: any = ContentType.meta();
  @Output()
  onClose: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();
  @Output()
  onSave: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();

  init() {
    super.init();
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
