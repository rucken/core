import { Fontawesome } from './../../../shared/models/fontawesome.model';
import { Component, Input, EventEmitter, Output, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { FontawesomesListModalComponent } from './../fontawesomes-list-modal/fontawesomes-list-modal.component';
import { AppService } from './../../../shared/services/app.service';
import { AccountService } from './../../../shared/services/account.service';
import { FontawesomeService } from './../../../shared/services/fontawesomes.service';
import { User } from './../../../shared/models/user.model';
import { BaseResourceInputComponent } from './../../../base/base-resources-grid/base-resource-input/base-resource-input.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fontawesome-input',
  templateUrl: './fontawesome-input.component.html',
  styleUrls: ['./fontawesome-input.component.scss'],
  entryComponents: [FontawesomesListModalComponent]
})

export class FontawesomeInputComponent extends BaseResourceInputComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  name = 'fontawesome';
  @Input()
  model: any | Fontawesome = new Fontawesome();
  @Output()
  modelChange: EventEmitter<any | Fontawesome> = new EventEmitter<any | Fontawesome>();

  items: any | Fontawesome[];
  cachedResourceService: FontawesomeService;

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public fontawesomeService: FontawesomeService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(translateService);
    this.cachedResourceService = fontawesomeService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  onLookup() {
    const itemModal: FontawesomesListModalComponent =
      this.app.modals(this.resolver).create(FontawesomesListModalComponent);
    itemModal.name = 'selectFontawesomes';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Fontawesomes');
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
    this.cachedResourceService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
}
