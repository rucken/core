import { isSimpleTemplateString } from 'codelyzer/util/utils';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { UsersListModalComponent } from '../users-list-modal/users-list-modal.component';
import { UsersService } from '../../../shared/users.service';
import { TranslateService } from '@ngx-translate/core';
import { ResourceSelectInputComponent } from '../../resources-grid/resource-select-input/resource-select-input.component';
import { SelectInputComponent } from '../../../controls/select-input/select-input.component';
import { User } from '../../../shared/models/user.model';
import { AppService } from '../../../shared/app.service';
import { AccountService } from '../../../shared/account.service';

@Component({
  selector: 'user-select-input',
  templateUrl: './user-select-input.component.html',
  styleUrls: ['./user-select-input.component.scss'],
  entryComponents: [UsersListModalComponent]
})

export class UserSelectInputComponent extends ResourceSelectInputComponent {
  @ViewChild('inputElement')
  inputElement: SelectInputComponent;
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?: string = 'fa fa-search';
  @Input()
  focused: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  inputReadonly: boolean = true;
  @Input()
  hardReadonly: boolean = false;
  @Input()
  name: string = 'user';
  @Input()
  placeholder: string = '';
  @Input()
  title: string = '';
  @Input()
  model: User = new User();
  @Output()
  modelChange: EventEmitter<User | any> = new EventEmitter<User | any>();

  @Input()
  modelAsString: string = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  hardValue: any = null;

  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  public items: User[] | any[];
  public cachedResourcesService: UsersService;
  constructor(
    public app: AppService,
    public accountService: AccountService,
    public usersService: UsersService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    this.cachedResourcesService = usersService.createCache();
  }
  get account(): User | any {
    return this.accountService.account;
  }
  onLookup() {
    let itemModal: UsersListModalComponent =
      this.app.modals(this.resolver).create(UsersListModalComponent);
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Users');
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
