import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserGroup } from '@rucken/core';
import { User } from '@rucken/core';
import { Group } from '@rucken/core';
import { UserGroupsService } from '@rucken/core';
import { GroupsService } from '@rucken/core';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { GroupModalComponent } from './../groups-grid/group-modal/group-modal.component';
import { GroupsListModalComponent } from './../groups-grid/groups-list-modal/groups-list-modal.component';

@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
  styleUrls: ['./user-groups-grid.component.scss'],
  entryComponents: [GroupsListModalComponent, GroupModalComponent, ConfirmModalComponent]
})

export class UserGroupsGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Input()
  user: any | User;
  @Output()
  onSelectItems: EventEmitter<any | UserGroup[] | UserGroup>;
  @Input()
  readonly?: boolean;
  @Input()
  hardReadonly = false;

  modelMeta: any = UserGroup.meta();
  items: any[] | UserGroup[];
  selectedItems: any[] | UserGroup[];
  cachedResourcesService: UserGroupsService;

  constructor(
    public userGroupsService: UserGroupsService,
    public groupsService: GroupsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
  }
  afterCreate() {
    this.cachedResourcesService = this.userGroupsService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: GroupsListModalComponent = this.app.modals(this.resolver).create(GroupsListModalComponent);
    itemModal.name = 'selectGroups';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.groups.maxSelectCount = 10000;
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.readonly;
    itemModal.text = this.translateService.instant('Append');
    itemModal.title = this.translateService.instant('Select groups for append to user');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group();
    itemModal.modal.show();
    this.selectedItems = [new UserGroup({
      id: itemModal.item.pk,
      group: itemModal.item
    })];
  }
  showEditModal(item: any | UserGroup) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.name = 'editUserGroup';
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['change_group']) || this.readonly;
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit group');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Group info');
    }
    itemModal.onOk.subscribe(($event: any) => this.saveGroup($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = item.group;
    itemModal.modal.show();
    this.selectedItems = [item];
    this.groupsService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  saveGroup(itemModal: GroupModalComponent) {
    this.groupsService.save(itemModal.item).subscribe(
      (group: any | Group) => {
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
  showRemoveModal(item: any | UserGroup) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeUserGroup';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a user group?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: GroupsListModalComponent) {
    const items: Group[] = itemModal.items;
    this.cachedResourcesService.save(items.map(item => new UserGroup({
      id: item.pk,
      group: item
    }))).subscribe(
      (userGroup: UserGroup) => {
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
