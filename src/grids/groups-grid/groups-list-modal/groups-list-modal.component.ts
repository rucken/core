import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../../../shared/models/group.model';
import { User } from '../../../shared/models/user.model';
import { ModalDirective } from 'ng2-bootstrap';
import { GroupsGridComponent } from '../groups-grid.component';

@Component({
  selector: 'groups-list-modal',
  templateUrl: './groups-list-modal.component.html',
  styleUrls: ['./groups-list-modal.component.scss']
})

export class GroupsListModalComponent implements OnInit {

  @Input()
  text: string;
  @Input()
  class: string;
  @Input()
  readonly: boolean;
  @Input()
  hardReadonly: boolean = false;
  @ViewChild('modal')
  modal: ModalDirective;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Output()
  onClose: EventEmitter<GroupsListModalComponent>;
  @Input()
  hideOnClose?: boolean;

  @ViewChild('groups')
  groups: GroupsGridComponent;

  @Input()
  account: any | User;
  @Input()
  title: string;
  @Output()
  onSave: EventEmitter<GroupsListModalComponent>;

  item: any | Group;
  items: Group[];
  public modelMeta: any = Group.meta;

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
    this.onClose = new EventEmitter<GroupsListModalComponent>();
    this.item = new Group();
    this.onSave = new EventEmitter<GroupsListModalComponent>();
  }

  ngOnInit() {
    this.groups.hardReadonly = this.hardReadonly;
    this.modal.onHidden.subscribe(() => this.close());
    this.modal.onShown.subscribe(() => this.focus());
  }

  focus() {
    this.groups.focus();
  }

  selectGroup(items: Group[]) {
    this.item = items[0];
    this.items = items;
  }

  close() {
    if (this.hideOnClose && this.modal.isShown) {
      this.modal.hide();
    }
    this.onClose.emit(this);
    return false;
  }

  select() {
    this.onSave.emit(this);
    return false;
  }
}
