import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from './../..//shared/models/user.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ElementRef } from '@angular/core';
import { Fontawesome } from './../../shared/models/fontawesome.model';
import { FontawesomeModalComponent } from './fontawesome-modal/fontawesome-modal.component';
import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { FontawesomesService } from './../../shared/fontawesomes.service';
import { AppService } from './../../shared/app.service';
import { AccountService } from './../../shared/account.service';
import { ResouceEnumStatus } from './../../shared/enums/resource.enums';
import { MetaModel } from './../../shared/models/meta.model';
import { BaseResourcesGridComponent } from './../../base/base-resources-grid/base-resources-grid.component';
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
  @Output()
  onEnter: EventEmitter<any[] | any>;

  modelMeta: any = Fontawesome.meta();
  items: any[] | Fontawesome[];
  selectedItems: any[] | Fontawesome[];
  cachedResourcesService: FontawesomesService;

  constructor(
    public sanitizer: DomSanitizer,
    public fontawesomesService: FontawesomesService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = fontawesomesService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly !== true || !this.account.checkPermissions(['add_fontawesome', 'change_fontawesome', 'delete_fontawesome']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'createFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['add_fontawesome']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new fontawesome');
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
  }
  showEditModal(item: any | Fontawesome) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'editFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_fontawesome']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit fontawesome');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Fontawesome info');
    }
    itemModal.onSave.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
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
    confirm.onYes.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
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
