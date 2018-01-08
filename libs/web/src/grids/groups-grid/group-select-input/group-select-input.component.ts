import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { GroupsService, translate } from '@rucken/core';
import { Group } from '@rucken/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

import {
  BaseResourceSelectInputComponent,
} from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { GroupsListModalComponent } from './../groups-list-modal/groups-list-modal.component';

@Component({
  selector: 'group-select-input',
  templateUrl: './group-select-input.component.html',
  styleUrls: ['./group-select-input.component.scss'],
  entryComponents: [GroupsListModalComponent]
})

export class GroupSelectInputComponent extends BaseResourceSelectInputComponent {

  @ViewChild('inputElement')
  inputElement: SelectInputComponent;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  name = 'group';
  @Input()
  model: any | Group = new Group();
  @Output()
  modelChange: EventEmitter<any | Group> = new EventEmitter<any | Group>();

  items: any[] | Group[];
  cachedResourcesService: GroupsService;

  groupsService: GroupsService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.groupsService = injector.get(GroupsService);
    this.cachedResourcesService = this.groupsService.createCache();
  }
  onLookup() {
    const itemModal: GroupsListModalComponent =
      this.app.modals(this.resolver).create(GroupsListModalComponent);
    itemModal.name = 'selectGroups';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.okTitle = translate('Select');
    itemModal.title = translate('Groups');
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
