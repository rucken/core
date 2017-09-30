import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { ContentType } from '@rucken/core';
import { Component, Input, EventEmitter, Output, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ContentTypesListModalComponent } from './../content-types-list-modal/content-types-list-modal.component';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { ContentTypesService } from '@rucken/core';
import { User } from '@rucken/core';
import { BaseResourceSelectInputComponent } from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { BaseResourceSelectInputConfig } from './../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.config';

@Component({
  selector: 'content-type-select-input',
  templateUrl: './content-type-select-input.component.html',
  styleUrls: ['./content-type-select-input.component.scss'],
  entryComponents: [ContentTypesListModalComponent]
})

export class ContentTypeSelectInputComponent extends BaseResourceSelectInputComponent {

  @ViewChild('inputElement')
  inputElement: any;
  @ViewChild('tooltip')
  tooltip: TooltipDirective;

  @Input()
  name = 'contentType';
  @Input()
  model: any | ContentType = new ContentType();
  @Output()
  modelChange: EventEmitter<any | ContentType> = new EventEmitter<any | ContentType>();

  items: any[] | ContentType[];
  cachedResourcesService: ContentTypesService;

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public contentTypeService: ContentTypesService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService,
    public config: BaseResourceSelectInputConfig
  ) {
    super(translateService, config);
    this.cachedResourcesService = contentTypeService.createCache();
  }
  changeInputValue(value: string) {
    const filter: any = {};
    this.cachedResourcesService.ignoreCache = true;
    this.cachedResourcesService.loadAll(value, filter);
  }
  get account(): any | User {
    return this.accountService.account;
  }
  onLookup() {
    const itemModal: ContentTypesListModalComponent =
      this.app.modals(this.resolver).create(ContentTypesListModalComponent);
    itemModal.name = 'selectContentTypes';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Content types');
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
  get statusListMessage() {
    return '';
  }
}
