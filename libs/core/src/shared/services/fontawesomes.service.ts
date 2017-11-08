import 'rxjs/add/operator/map';

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { FontawesomeItemsMock } from './../mocks/fontawesome-items.mock';
import { Fontawesome } from './../models/fontawesome.model';

@Injectable()
export class FontawesomeService extends BaseRepositoryService {
  items$: Subject<Fontawesome[]>;
  items: Fontawesome[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'fontawesomes';
    this.name = 'fontawesome';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Fontawesome[]>>new Subject();
    this.mockedItems = FontawesomeItemsMock;
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new Fontawesome(item);
  }
  newCache() {
    return new FontawesomeService(this.injector);
  }
}
