import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { ModalDirective } from 'ng2-bootstrap';
import { AccountService } from '../../../shared/account.service';
import { User } from '../../../shared/models/user.model';
import { TextInputComponent } from '../../../controls/text-input/text-input.component';

@Component({
  selector: 'fontawesome-modal',
  templateUrl: './fontawesome-modal.component.html',
  styleUrls: ['./fontawesome-modal.component.scss']
})

export class FontawesomeModalComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @Input()
  text: string = '';
  @Input()
  class: string = '';
  @Input()
  readonly: boolean = false;
  @Input()
  hideOnClose?: boolean = true;;
  @Input()
  account: any | User = null;
  @Input()
  title: string = '';
  @Input()
  item: Fontawesome = new Fontawesome();
  @Input()
  modelMeta: any = Fontawesome.meta;
  @Output()
  onClose: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();
  @Output()
  onSave: EventEmitter<FontawesomeModalComponent> = new EventEmitter<FontawesomeModalComponent>();

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }
  focus() {
    this.focusElement.focus();
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
