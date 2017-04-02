import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import { ContentType } from './../../../shared/models/content-type.model';
import { ModalDirective } from 'ng2-bootstrap';
import { AccountService } from './../../../shared/account.service';
import { User } from './../../../shared/models/user.model';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';

@Component({
  selector: 'content-type-modal',
  templateUrl: './content-type-modal.component.html',
  styleUrls: ['./content-type-modal.component.scss']
})

export class ContentTypeModalComponent implements OnInit {

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
  item: any | ContentType = new ContentType();
  @Input()
  modelMeta: any = ContentType.meta();
  @Output()
  onClose: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();
  @Output()
  onSave: EventEmitter<ContentTypeModalComponent> = new EventEmitter<ContentTypeModalComponent>();

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
