import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Fontawesome } from './../models/fontawesome.model';
import { BaseRepositoryService } from './../base/services/base-repository.service';
import { FontawesomeItemsMock } from './../mocks/fontawesome-items.mock';
import { RepositoryHelper } from './../helpers/repository.helper';
@Injectable()
export class FontawesomeService extends BaseRepositoryService {
  items$: Subject<Fontawesome[]>;
  items: Fontawesome[];
  apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'fontawesomes';
    this.name = 'fontawesome';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Fontawesome[]>>new Subject();
    this.mockedItems = FontawesomeItemsMock;
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new Fontawesome(item);
  }
  newCache() {
    return new FontawesomeService(this.repositoryHelper);
  }
}
