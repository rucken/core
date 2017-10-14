import 'rxjs/add/operator/map';

import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';
import { Permission } from '@rucken/core';
import { Group } from '@rucken/core';
import { GroupPermissionsService } from '@rucken/core';
import { PermissionsService } from '@rucken/core';
import { GroupPermission } from '@rucken/core';
import { User } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { PermissionModalComponent } from './../permissions-grid/permission-modal/permission-modal.component';
import {
    PermissionsListModalComponent,
} from './../permissions-grid/permissions-list-modal/permissions-list-modal.component';

@Component({
  selector: 'group-permissions-grid',
  templateUrl: './group-permissions-grid.component.html',
  styleUrls: ['./group-permissions-grid.component.scss'],
  entryComponents: [PermissionModalComponent, PermissionsListModalComponent, ConfirmModalComponent]
})

export class GroupPermissionsGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<GroupPermission[] | any>;
  @Input()
  group: any | Group;
  @Input()
  readonly: boolean;
  @Input()
  hardReadonly = false;

  modelMeta: any = GroupPermission.meta();
  items: GroupPermission[];
  selectedItems: GroupPermission[];
  cachedResourcesService: GroupPermissionsService;

  constructor(
    public groupPermissionsService: GroupPermissionsService,
    public permissionsService: PermissionsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
  }
  afterCreate() {
    this.cachedResourcesService = this.groupPermissionsService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: PermissionsListModalComponent = this.app.modals(this.resolver).create(PermissionsListModalComponent);
    itemModal.name = 'createGroupPermission';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.permissions.maxSelectCount = 10000;
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.readonly;
    itemModal.text = this.translateService.instant('Append');
    itemModal.title = this.translateService.instant('Select permissions for append to group');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission();
    itemModal.modal.show();
    this.selectedItems = [new GroupPermission({
      id: itemModal.item.pk,
      permission: itemModal.item
    })];
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: GroupPermission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.name = 'editGroupPermission';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_permission']) || this.readonly;
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit permission');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Permission info');
    }
    itemModal.onOk.subscribe(($event: any) => this.savePermission($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = item.permission;
    itemModal.modal.show();
    this.permissionsService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  savePermission(itemModal: PermissionModalComponent) {
    this.permissionsService.save(itemModal.item).subscribe(
      (permission: any | Permission) => {
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
  showRemoveModal(item: GroupPermission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeGroupPermission';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a group permission?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: PermissionsListModalComponent) {
    const items: Permission[] = itemModal.items;
    this.cachedResourcesService.save(items.map(item => new GroupPermission({
      id: item.pk,
      permission: item
    }))).subscribe(
      (groupPermission: GroupPermission) => {
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
