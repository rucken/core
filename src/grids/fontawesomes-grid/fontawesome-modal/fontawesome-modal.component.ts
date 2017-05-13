import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from '../../../shared/account.service';
import { User } from '../../../shared/models/user.model';
import { TextInputComponent } from '../../../controls/text-input/text-input.component';
import { BaseComponent } from '../../../controls/base-component/base-component.component';

@Component({
  selector: 'fontawesome-modal',
  templateUrl: './fontawesome-modal.component.html',
  styleUrls: ['./fontawesome-modal.component.scss']
})

export class FontawesomeModalComponent extends BaseComponent {

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
  item: any | Fontawesome = new Fontawesome();
  @Input()
  modelMeta: any = Fontawesome.meta();
  @Output()
  onClose: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();
  @Output()
  onSave: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();

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
