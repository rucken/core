import 'rxjs/add/operator/takeUntil';

import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Group } from '@rucken/core';
import { GroupsService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { GroupModalComponent } from './group-modal/group-modal.component';

@Component({
  selector: 'groups-grid',
  templateUrl: './groups-grid.component.html',
  styleUrls: ['./groups-grid.component.scss'],
  entryComponents: [GroupModalComponent, ConfirmModalComponent]
})

export class GroupsGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<any | Group[]>;

  modelMeta: any = Group.meta();
  items: any[] | Group[];
  selectedItems: any[] | Group[];
  cachedResourcesService: GroupsService;

  groupsService: GroupsService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService // todo: for correct work @biesbjerg/ngx-translate-extract
  ) {
    super(injector);
    this.groupsService = injector.get(GroupsService);
    this.cachedResourcesService = this.groupsService.createCache();
  }
  init() {
    super.init();
  }
  get readonly() {
    return this.hardReadonly || !(this.accessToAdd || this.accessToChange || this.accessToDelete);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.name = 'createGroup';
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.accessToAdd;
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new group');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | Group) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.name = 'editGroup';
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.accessToChange;
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit group');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Group info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showRemoveModal(item: any | Group) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeGroup';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a group?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: GroupModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
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
