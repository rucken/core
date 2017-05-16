import { User } from './../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { GroupPermission } from './../../shared/models/group-permission.model';
import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { GroupPermissionsService } from './../../shared/group-permissions.service';
import { AppService } from './../../shared/app.service';
import { AccountService } from './../../shared/account.service';
import { ResouceEnumStatus } from './../../shared/enums/resource.enums';
import { MetaModel } from './../../shared/models/meta.model';
import { PermissionsListModalComponent } from './../permissions-grid/permissions-list-modal/permissions-list-modal.component';
import { Permission } from './../../shared/models/permission.model';
import { Group } from './../../shared/models/group.model';
import { PermissionModalComponent } from './../permissions-grid/permission-modal/permission-modal.component';
import { PermissionsService } from './../../shared/permissions.service';
import { BaseResourcesGridComponent } from './../../base/base-resources-grid/base-resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

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
  @Output()
  onEnter: EventEmitter<any[] | any>;
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
    this.cachedResourcesService = groupPermissionsService.createCache();
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
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission();
    itemModal.modal.show();
    this.selectedItems = [new GroupPermission({
      id: itemModal.item.pk,
      permission: itemModal.item
    })];
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
    itemModal.onSave.subscribe(($event: any) => this.savePermission($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = item.permission;
    itemModal.modal.show();
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
    confirm.onYes.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
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
