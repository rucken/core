import 'rxjs/add/operator/takeUntil';

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
import { Permission } from '@rucken/core';
import { PermissionsService } from '@rucken/core';

import {
  BaseResourceInputComponent,
} from './../../../base/base-resources-grid/base-resource-input/base-resource-input.component';
import { PermissionsListModalComponent } from './../permissions-list-modal/permissions-list-modal.component';
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

  permissionsService: PermissionsService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService // todo: for correct work @biesbjerg/ngx-translate-extract
  ) {
    super(injector);
    this.permissionsService = injector.get(PermissionsService);
    this.cachedResourcesService = this.permissionsService.createCache();
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
    this.cachedResourcesService.changeStatusItem$.takeUntil(this.destroyed$).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
}
