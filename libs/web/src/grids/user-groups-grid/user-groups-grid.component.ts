import { takeUntil } from 'rxjs/operators';

import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { translate, UserGroupsService } from '@rucken/core';
import { UserGroup } from '@rucken/core';
import { User } from '@rucken/core';
import { Group } from '@rucken/core';
import { GroupsService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { GroupModalComponent } from './../groups-grid/group-modal/group-modal.component';
import { GroupsListModalComponent } from './../groups-grid/groups-list-modal/groups-list-modal.component';

@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
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
  items: UserGroup[];
  selectedItems: UserGroup[];
  cachedResourcesService: UserGroupsService;

  userGroupsService: UserGroupsService;
  groupsService: GroupsService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.userGroupsService = injector.get(UserGroupsService);
    this.groupsService = injector.get(GroupsService);
    this.cachedResourcesService = this.userGroupsService.createCache();
  }
  initAccesses(contentType?: string) {
    this.accessToRead = true;
    this.accessToManage = this.checkPermissions(['manage_user']);
    this.accessToAdd = this.accessToManage ? this.accessToManage : this.checkPermissions(['change_user']);
    this.accessToChange = this.accessToManage ? this.accessToManage : this.checkPermissions(['change_group']);
    this.accessToDelete = this.accessToManage ? this.accessToManage : this.checkPermissions(['change_user']);
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
    itemModal.readonly = this.readonly;
    itemModal.okTitle = translate('Append');
    itemModal.title = translate('Select groups for append to user');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group();
    itemModal.modal.show();
    this.selectedItems = [new UserGroup({
      id: itemModal.item.pk,
      group: itemModal.item
    })];
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | UserGroup) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.name = 'editUserGroup';
    itemModal.readonly = this.hardReadonly || !this.accessToChange || this.readonly;
    itemModal.okTitle = translate('Save');
    itemModal.title = translate('Edit group');
    if (itemModal.readonly) {
      itemModal.title = translate('Group info');
    }
    itemModal.onOk.subscribe(($event: any) => this.saveGroup($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group(item.group);
    itemModal.modal.show();
    this.selectedItems = [item];
    this.groupsService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  saveGroup(itemModal: GroupModalComponent) {
    this.groupsService.save(itemModal.item).subscribe(
      (group: any | Group) => {
        itemModal.modal.hide();
        this.items = this.items.map(item => {
          if (item.pk === group.pk) {
            item.group = group;
          }
          return item;
        });
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
    confirm.title = translate('Remove');
    confirm.message = translate('Are you sure you want to remove a user group?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe((status: any) =>
      confirm.okInProcessFromStatus(status)
    );
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
