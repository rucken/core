import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { User } from './../../shared/models/user.model';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { AccountService } from './../../shared/account.service';
import { AppService } from './../../shared/app.service';
import { UsersService } from '../../shared/users.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';
import { ResourcesGridComponent } from '../resources-grid/resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  entryComponents: [UserModalComponent, ConfirmModalComponent]
})

export class UsersGridComponent extends ResourcesGridComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<User[] | any>;
  @Output()
  onEnter: EventEmitter<any[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  public modelMeta: any = User.meta();
  public items: User[] | any[];
  public searchText: string = '';
  public selectedItems: User[] | any[];
  public cachedResourcesService: UsersService;

  constructor(
    public usersService: UsersService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = usersService.createCache();
  }
  get account(): User | any {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly !== true || !this.account || !this.account.checkPermissions(['add_user', 'change_user', 'delete_user']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: UserModalComponent = this.app.modals(this.resolver).create(UserModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['add_user']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new user');
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new User();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | User) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: UserModalComponent = this.app.modals(this.resolver).create(UserModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = this.hardReadonly || !this.account || !this.account.checkPermissions(['change_user']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit user');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('User info');
    }
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new User(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showRemoveModal(item: any | User) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a user?');
    confirm.onYes.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: UserModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (user: User | any) => {
        itemModal.modal.hide();
      }, (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              itemModal.info.emit({ username: '' });
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
