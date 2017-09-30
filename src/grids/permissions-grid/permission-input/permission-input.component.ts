import { Permission } from '@rucken/core';
import { Component, Input, EventEmitter, Output, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { PermissionsListModalComponent } from './../permissions-list-modal/permissions-list-modal.component';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { PermissionsService } from '@rucken/core';
import { User } from '@rucken/core';
import { BaseResourceInputComponent } from './../../../base/base-resources-grid/base-resource-input/base-resource-input.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'permission-input',
  templateUrl: './permission-input.component.html',
  styleUrls: ['./permission-input.component.scss'],
  entryComponents: [PermissionsListModalComponent]
})

export class PermissionInputComponent extends BaseResourceInputComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  name = 'permission';
  @Input()
  model: any | Permission = new Permission();
  @Output()
  modelChange: EventEmitter<any | Permission> = new EventEmitter<any | Permission>();

  items: any[] | Permission[];
  cachedResourcesService: PermissionsService;

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public permissionsService: PermissionsService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(translateService);
    this.cachedResourcesService = permissionsService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  onLookup() {
    const itemModal: PermissionsListModalComponent =
      this.app.modals(this.resolver).create(PermissionsListModalComponent);
    itemModal.name = 'selectPermissions';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Permissions');
    itemModal.onOk.subscribe(($event: any) => {
      this.value = itemModal.item;
      if (this.inputReadonly === false) {
        this.valueAsString = '';
      }
      itemModal.modal.hide();
    });
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = this.value;
    itemModal.modal.show();
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
}
