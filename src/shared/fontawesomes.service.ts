import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Fontawesome } from './models/fontawesome.model';
import { RepositoryService } from './repository.service';
import { FontawesomeItemsMock } from './mocks/fontawesome-items.mock';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class FontawesomesService extends RepositoryService {
  public items$: Subject<Fontawesome[]>;
  public items: Fontawesome[];
  public apiUrl: string;

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
    return new FontawesomesService(this.repositoryHelper);
  }
}
