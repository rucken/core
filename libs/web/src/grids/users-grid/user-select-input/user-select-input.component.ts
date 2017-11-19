import { takeUntil } from 'rxjs/operators';

import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User, translate } from '@rucken/core';
import { UsersService } from '@rucken/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

import {
  BaseResourceSelectInputComponent,
} from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { UsersListModalComponent } from './../users-list-modal/users-list-modal.component';

@Component({
  selector: 'user-select-input',
  templateUrl: './user-select-input.component.html',
  styleUrls: ['./user-select-input.component.scss'],
  entryComponents: [UsersListModalComponent]
})

export class UserSelectInputComponent extends BaseResourceSelectInputComponent {

  @ViewChild('inputElement')
  inputElement: SelectInputComponent;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  name = 'user';
  @Input()
  model: any | User = new User();
  @Output()
  modelChange: EventEmitter<any | User> = new EventEmitter<any | User>();

  items: any[] | User[];
  cachedResourcesService: UsersService;

  usersService: UsersService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.usersService = injector.get(UsersService);
    this.cachedResourcesService = this.usersService.createCache();
  }
  onLookup() {
    const itemModal: UsersListModalComponent =
      this.app.modals(this.resolver).create(UsersListModalComponent);
    itemModal.name = 'selectUsers';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.okTitle = translate('Select');
    itemModal.title = translate('Users');
    itemModal.onOk.subscribe(($event: any) => {
      this.value = itemModal.item;
      if (this.inputElement) {
        this.inputElement.value = this.value ? this.value.pk : null;
      }
      if (this.inputReadonly === false) {
        this.valueAsString = '';
      }
      itemModal.modal.hide();
    });
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = this.value;
    itemModal.modal.show();
  }
}
