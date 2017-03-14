import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { Permission } from './../../shared/models/permission.model';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { PermissionsService } from '../../shared/permissions.service';
import { AppService } from '../../shared/app.service';
import { AccountService } from '../../shared/account.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';
import { ResourcesGridComponent } from '../resources-grid/resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'permissions-grid',
  templateUrl: './permissions-grid.component.html',
  styleUrls: ['./permissions-grid.component.scss'],
  entryComponents: [PermissionModalComponent, ConfirmModalComponent]
})

export class PermissionsGridComponent extends ResourcesGridComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<Permission[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  public modelMeta: any = Permission.meta;
  public items: Permission[];
  public searchText: string = '';
  public selectedItems: Permission[];
  public cachedResourcesService: PermissionsService;

  constructor(
    public permissionsService: PermissionsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = permissionsService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly !== true || !this.account || !this.account.checkPermissions(['add_permission', 'change_permission', 'delete_permission']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account || !this.account.checkPermissions(['add_permission']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new permission');
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | Permission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account || !this.account.checkPermissions(['change_permission']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit permission');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Permission info');
    }
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showRemoveModal(item: any | Permission) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a permission?');
    confirm.onYes.subscribe(($event:any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: PermissionModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (permission: Permission) => {
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
