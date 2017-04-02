import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { ContentType } from './../../shared/models/content-type.model';
import { ContentTypeModalComponent } from './content-type-modal/content-type-modal.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { ContentTypesService } from '../../shared/content-types.service';
import { AppService } from '../../shared/app.service';
import { AccountService } from '../../shared/account.service';
import { ResouceEnumStatus } from '../../shared/enums/resource.enums';
import { MetaModel } from '../../shared/models/meta.model';
import { ResourcesGridComponent } from '../resources-grid/resources-grid.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'content-types-grid',
  templateUrl: './content-types-grid.component.html',
  styleUrls: ['./content-types-grid.component.scss'],
  entryComponents: [ContentTypeModalComponent, ConfirmModalComponent]
})

export class ContentTypesGridComponent extends ResourcesGridComponent {

  @Input()
  loadAll?: boolean;
  @Output()
  onSelectItems: EventEmitter<ContentType[] | any>;
  @ViewChild('focusElement')
  focusElement: ElementRef;

  public modelMeta: any = ContentType.meta();
  public items: ContentType[];
  public searchText: string = '';
  public selectedItems: ContentType[];
  public cachedResourcesService: ContentTypesService;

  constructor(
    public contentTypesService: ContentTypesService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = contentTypesService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly !== true || !this.account.checkPermissions(['add_contenttype', 'change_contenttype', 'delete_contenttype']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: ContentTypeModalComponent = this.app.modals(this.resolver).create(ContentTypeModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['add_contenttype']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new content type');
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new ContentType();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | ContentType) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let itemModal: ContentTypeModalComponent = this.app.modals(this.resolver).create(ContentTypeModalComponent);
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_contenttype']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit content type');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Content type info');
    }
    itemModal.onSave.subscribe(($event:any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new ContentType(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showRemoveModal(item: any | ContentType) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a content type?');
    confirm.onYes.subscribe(($event:any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
  }
  save(itemModal: ContentTypeModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (contentType: ContentType) => {
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
