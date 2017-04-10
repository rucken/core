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
import { ResourceSelectInputComponent } from '../../resources-grid/resource-select-input/resource-select-input.component';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TooltipDirective } from 'ng2-bootstrap/tooltip';
import { ResourceSelectInputConfig } from '../../resources-grid/resource-select-input/resource-select-input.config';

@Component({
  selector: 'content-type-select-input',
  templateUrl: './content-type-select-input.component.html',
  styleUrls: ['./content-type-select-input.component.scss'],
  entryComponents: [ContentTypesListModalComponent]
})

export class ContentTypeSelectInputComponent extends ResourceSelectInputComponent {
  @Input()
  labelClass?: string = 'control-label';
  @Input()
  inputClass?: string;
  @ViewChild('inputElement')
  inputElement: any;
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?: string = 'fa fa-search';
  @Input()
  focused: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  hardReadonly: boolean = false;
  @Input()
  inputReadonly: boolean = true;
  @Input()
  name: string = 'contentType';
  @Input()
  placeholder: string = '';
  @Input()
  title: string = '';
  @Input()
  model: ContentType = new ContentType();
  @Output()
  modelChange: EventEmitter<ContentType> = new EventEmitter<ContentType>();

  @Input()
  modelAsString: string = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  hardValue: any = null;

  @ViewChild('tooltip')
  public tooltip: TooltipDirective;
  @Input()
  public tooltipEnable: boolean;
  @Input()
  public tooltipText: string = '';
  @Input()
  public tooltipPlacement: string = 'bottom';
  @Input()
  public tooltipTriggers: string = 'hover focus';

  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  public items: ContentType[];
  public cachedResourcesService: ContentTypesService;
  constructor(
    public app: AppService,
    public accountService: AccountService,
    public contentTypesService: ContentTypesService,
    public resolver: ComponentFactoryResolver,
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: ResourceSelectInputConfig
  ) {
    super(sanitizer, translateService, config);
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    this.cachedResourcesService = contentTypesService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  onLookup() {
    let itemModal: ContentTypesListModalComponent =
      this.app.modals(this.resolver).create(ContentTypesListModalComponent);
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
}
