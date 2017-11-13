import 'rxjs/add/operator/takeUntil';

import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { ContentType, translate } from '@rucken/core';
import { ContentTypesService } from '@rucken/core';

import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { ContentTypeModalComponent } from './content-type-modal/content-type-modal.component';

@Component({
  selector: 'content-types-grid',
  templateUrl: './content-types-grid.component.html',
  styleUrls: ['./content-types-grid.component.scss'],
  entryComponents: [ContentTypeModalComponent, ConfirmModalComponent]
})

export class ContentTypesGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<any[] | ContentType[] | any>;

  modelMeta: any = ContentType.meta();
  items: any[] | ContentType[];
  selectedItems: any[] | ContentType[];
  cachedResourcesService: ContentTypesService;

  contentTypesService: ContentTypesService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.contentTypesService = injector.get(ContentTypesService);
    this.cachedResourcesService = this.contentTypesService.createCache();
  }
  get readonly() {
    return this.hardReadonly || !(this.accessToAdd || this.accessToChange || this.accessToDelete);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: ContentTypeModalComponent = this.app.modals(this.resolver).create(ContentTypeModalComponent);
    itemModal.name = 'createContentType';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.accessToAdd;
    itemModal.okTitle = translate('Create');
    itemModal.title = translate('Create new content type');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new ContentType();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | ContentType) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: ContentTypeModalComponent = this.app.modals(this.resolver).create(ContentTypeModalComponent);
    itemModal.name = 'editContentType';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.accessToChange;
    itemModal.okTitle = translate('Save');
    itemModal.title = translate('Edit content type');
    if (itemModal.readonly) {
      itemModal.title = translate('Content type info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new ContentType(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showRemoveModal(item: any | ContentType) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeContentType';
    confirm.size = 'md';
    confirm.title = translate('Remove');
    confirm.message = translate('Are you sure you want to remove a content type?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: ContentTypeModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (contentType: any | ContentType) => {
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
