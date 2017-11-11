import { takeUntil } from 'rxjs/operators';

import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { GroupsService } from '@rucken/core';
import { Group } from '@rucken/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

import {
  BaseResourceSelectInputComponent,
} from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { GroupsListModalComponent } from './../groups-list-modal/groups-list-modal.component';
import { TranslateService } from '@ngx-translate/core';

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
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService // todo: for correct work @biesbjerg/ngx-translate-extract
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
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Groups');
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
    this.cachedResourcesService.changeStatusItem$.pipe(takeUntil(this.destroyed$)).subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
}
