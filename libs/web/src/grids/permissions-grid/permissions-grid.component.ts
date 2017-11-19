import { takeUntil } from 'rxjs/operators';

import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { Permission, translate } from '@rucken/core';
import { PermissionsService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';

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
  cachedResourcesService: PermissionsService;

  permissionsService: PermissionsService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.permissionsService = injector.get(PermissionsService);
    this.cachedResourcesService = this.permissionsService.createCache();
  }
  get readonly() {
    return this.hardReadonly || !(this.accessToAdd || this.accessToChange || this.accessToDelete);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: PermissionModalComponent = this.app.modals(this.resolver).create(PermissionModalComponent);
    itemModal.name = 'createPermission';
    itemModal.readonly = this.hardReadonly || !this.accessToAdd;
    itemModal.okTitle = translate('Create');
    itemModal.title = translate('Create new permission');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
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
    itemModal.readonly = this.hardReadonly || !this.accessToChange;
    itemModal.okTitle = translate('Save');
    itemModal.title = translate('Edit permission');
    if (itemModal.readonly) {
      itemModal.title = translate('Permission info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Permission(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
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
    confirm.title = translate('Remove');
    confirm.message = translate('Are you sure you want to remove a permission?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: PermissionModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
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
