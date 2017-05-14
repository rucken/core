import { isSimpleTemplateString } from 'codelyzer/util/utils';
import { SelectInputComponent } from './../../../controls/select-input/select-input.component';
import { ContentType } from '../../../shared/models/content-type.model';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { ContentTypesListModalComponent } from '../content-types-list-modal/content-types-list-modal.component';
import { AppService } from './../../../shared/app.service';
import { AccountService } from './../../../shared/account.service';
import { ContentTypesService } from '../../../shared/content-types.service';
import { User } from './../../../shared/models/user.model';
import { ResouceEnumStatus } from './../../../shared/enums/resource.enums';
import { BaseResourceSelectInputComponent } from '../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.component';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { BaseResourceSelectInputConfig } from '../../../base/base-resources-grid/base-resource-select-input/base-resource-select-input.config';

@Component({
  selector: 'content-type-select-input',
  templateUrl: './content-type-select-input.component.html',
  styleUrls: ['./content-type-select-input.component.scss'],
  entryComponents: [ContentTypesListModalComponent]
})

export class ContentTypeSelectInputComponent extends BaseResourceSelectInputComponent {
  @Input()
  labelClass? = 'control-label';
  @Input()
  inputClass? = 'form-control';
  @Input()
  inputFrameClass? = '';

  @ViewChild('inputElement')
  inputElement: any;
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon? = 'fa fa-search';
  @Input()
  readonly = false;
  @Input()
  hardReadonly = false;
  @Input()
  inputReadonly = true;
  @Input()
  name = 'contentType';
  @Input()
  placeholder = '';
  @Input()
  title = '';
  @Input()
  model: any | ContentType = new ContentType();
  @Output()
  modelChange: EventEmitter<any | ContentType> = new EventEmitter<any | ContentType>();

  @Input()
  modelAsString = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  hardValue: any = null;

  @ViewChild('tooltip')
  tooltip: TooltipDirective;
  @Input()
  tooltipEnable: boolean;
  @Input()
  tooltipText = '';
  @Input()
  tooltipPlacement = 'bottom';
  @Input()
  tooltipTriggers = 'hover focus';

  items: any[] | ContentType[];
  cachedResourcesService: ContentTypesService;
  constructor(
    public app: AppService,
    public accountService: AccountService,
    public contentTypesService: ContentTypesService,
    public resolver: ComponentFactoryResolver,
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: BaseResourceSelectInputConfig
  ) {
    super(sanitizer, translateService, config);
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    this.cachedResourcesService = contentTypesService.createCache();
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
    itemModal.onSave.subscribe(($event: any) => {
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
  }
  get statusListMessage() {
    return '';
  }
}
