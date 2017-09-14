import { User } from './../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, Input, Output, HostListener, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { Permission } from './../../shared/models/permission.model';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { PermissionsService } from './../../shared/services/permissions.service';
import { AppService } from './../../shared/services/app.service';
import { AccountService } from './../../shared/services/account.service';
import { EndpointStatusEnum } from './../../shared/enums/endpoint-status.enum';
import { MetaModel } from './../../shared/models/meta.model';
import { BaseResourcesGridComponent } from './../../base/base-resources-grid/base-resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'permissions-grid',
  templateUrl: './permissions-grid.component.html',
  styleUrls: ['./permissions-grid.component.scss'],
  entryComponents: [PermissionModalComponent, ConfirmModalComponent]
})

export class PermissionsGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<any[] | Permission[]>;

  modelMeta: any = Permission.meta();
  items: any[] | Permission[];
  selectedItems: any[] | Permission[];
  cachedResourceService: PermissionsService;

  constructor(
    public permissionsService: PermissionsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourceService = permissionsService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly || !this.account || !this.account.checkPermissions(['add_permission', 'change_permission', 'delete_permission']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.name = 'createPermission';
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['add_permission']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new permission');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourceService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | Permission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.name = 'editPermission';
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['change_permission']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit permission');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Permission info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourceService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showRemoveModal(item: any | Permission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removePermission';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a permission?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourceService.changeStatusItem$.subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: PermissionModalComponent) {
    this.cachedResourceService.save(itemModal.item).subscribe(
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
  remove(itemModal: ConfirmModalComponent) {
    this.cachedResourceService.remove(this.selectedItems).subscribe(
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
