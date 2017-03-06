import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { UserGroup } from './../../shared/models/user-group.model';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { UserGroupsService } from '../../shared/user-groups.service';
import { AppService } from '../../shared/app.service';
import { AccountService } from '../../shared/account.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';
import { GroupsListModalComponent } from '../groups-grid/groups-list-modal/groups-list-modal.component';
import { Group } from '../../shared/models/group.model';
import { GroupModalComponent } from '../groups-grid/group-modal/group-modal.component';
import { GroupsService } from '../../shared/groups.service';
import { ResourcesGridComponent } from '../resources-grid/resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'user-groups-grid',
  templateUrl: './user-groups-grid.component.html',
  styleUrls: ['./user-groups-grid.component.scss'],
  entryComponents: [GroupsListModalComponent, GroupModalComponent, ConfirmModalComponent]
})

export class UserGroupsGridComponent extends ResourcesGridComponent {

  @Input()
  user: User;
  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<UserGroup[] | UserGroup>;
  @ViewChild('focusElement')
  focusElement: ElementRef;
  @Input()
  public readonly: boolean;

  public modelMeta: any = UserGroup.meta;
  public items: UserGroup[];
  public selectedItems: UserGroup[];
  public cachedResourcesService: UserGroupsService;

  constructor(
    public userGroupsService: UserGroupsService,
    public groupsService: GroupsService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = userGroupsService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: GroupsListModalComponent = this.app.modals(this.resolver).create(GroupsListModalComponent);
    itemModal.groups.maxSelectCount = 10000;
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.readonly;
    itemModal.text = this.translateService.instant('Append');
    itemModal.title = this.translateService.instant('Select groups for append to user');
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Group();
    itemModal.modal.show();
    this.selectedItems = [new UserGroup({
      id: itemModal.item.pk,
      group: itemModal.item
    })];
  }
  showEditModal(item: UserGroup) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: GroupModalComponent = this.app.modals(this.resolver).create(GroupModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_group']) || this.readonly;
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit group');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Group info');
    }
    itemModal.onSave.subscribe(($event: any) => this.saveGroup($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = item.group;
    itemModal.modal.show();
    this.selectedItems = [item];
  }
  saveGroup(itemModal: GroupModalComponent) {
    this.groupsService.save(itemModal.item).subscribe(
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
  showRemoveModal(item: UserGroup) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a user group?');
    confirm.onYes.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: GroupsListModalComponent) {
    this.cachedResourcesService.save(itemModal.items.map(item => new UserGroup({
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
