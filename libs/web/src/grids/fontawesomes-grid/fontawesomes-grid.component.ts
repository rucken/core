import { takeUntil } from 'rxjs/operators';

import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { Fontawesome } from '@rucken/core';
import { FontawesomeService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { FontawesomeModalComponent } from './fontawesome-modal/fontawesome-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fontawesomes-grid',
  templateUrl: './fontawesomes-grid.component.html',
  styleUrls: ['./fontawesomes-grid.component.scss'],
  entryComponents: [FontawesomeModalComponent, ConfirmModalComponent]
})

export class FontawesomesGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<any[] | Fontawesome[]>;

  modelMeta: any = Fontawesome.meta();
  items: any[] | Fontawesome[];
  selectedItems: any[] | Fontawesome[];
  cachedResourcesService: FontawesomeService;

  fontawesomeService: FontawesomeService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService // todo: for correct work @biesbjerg/ngx-translate-extract
  ) {
    super(injector);
    this.fontawesomeService = injector.get(FontawesomeService);
    this.cachedResourcesService = this.fontawesomeService.createCache();
  }
  get readonly() {
    return this.hardReadonly || !(this.accessToAdd || this.accessToChange || this.accessToDelete);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'createFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.accessToAdd;
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new fontawesome');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | Fontawesome) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'editFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.accessToChange;
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit fontawesome');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Fontawesome info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showRemoveModal(item: any | Fontawesome) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeFontawesome';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a fontawesome?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: FontawesomeModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (fontawesome: any | Fontawesome) => {
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
