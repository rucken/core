import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { Group } from './../../shared/models/group.model';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { GroupsService } from '../../shared/groups.service';
import { AppService } from '../../shared/app.service';
import { AccountService } from '../../shared/account.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';
import { ResourcesGridComponent } from '../resources-grid/resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'groups-grid',
  templateUrl: './groups-grid.component.html',
  styleUrls: ['./groups-grid.component.scss'],
  entryComponents: [GroupModalComponent, ConfirmModalComponent]
})

export class GroupsGridComponent extends ResourcesGridComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<Group[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  public modelMeta: any = Group.meta;
  public items: Group[];
  public searchText: string = '';
  public selectedItems: Group[];
  public cachedResourcesService: GroupsService;

  constructor(
    public groupsService: GroupsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = groupsService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  get readonly() {
    return !this.account.checkPermissions(['add_group', 'change_group', 'delete_group']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['add_group']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new group');
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | Group) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_group']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit group');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Group info');
    }
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showRemoveModal(item: any | Group) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a group?');
    confirm.onYes.subscribe(($event:any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: GroupModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (group: Group) => {
        itemModal.modal.hide();
      }, (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              itemModal.info.emit({ name: '' });
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
  remove(itemModal: ConfirmModalComponent) {
    this.cachedResourcesService.remove(this.selectedItems).subscribe(
      () => {
        itemModal.modal.hide();
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              this.focus();
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
}
