import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, User, USERS_CONFIG_TOKEN } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { UsersGridComponent } from '../users-grid/users-grid.component';

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectComponent extends UsersGridComponent implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'username';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(USERS_CONFIG_TOKEN)
    protected usersConfig: IRestProviderOptions<User>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      usersConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.usersConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.usersConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof User;
  }
}
