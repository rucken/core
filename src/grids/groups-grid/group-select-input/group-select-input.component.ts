import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { Group } from './../../../shared/models/group.model';
import { Component, Input, EventEmitter, Output, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { GroupsListModalComponent } from './../groups-list-modal/groups-list-modal.component';
import { AppService } from './../../../shared/app.service';
import { AccountService } from './../../../shared/account.service';
import { GroupsService } from './../../../shared/groups.service';
import { User } from './../../../shared/models/user.model';
import { BaseResourceSelectInputComponent } from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseResourceSelectInputConfig } from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.config';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

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

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public groupsService: GroupsService,
    public resolver: ComponentFactoryResolver,
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: BaseResourceSelectInputConfig
  ) {
    super(sanitizer, translateService, config);
    this.cachedResourcesService = groupsService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
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
        this.inputElement.value = this.value.pk;
      }
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
