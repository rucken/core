import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Fontawesome } from './models/fontawesome.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { FontawesomeItemsMock } from './mocks/fontawesome-items.mock';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class FontawesomesService extends RepositoryService {
  public items$: Subject<Fontawesome[]>;
  public items: Fontawesome[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'fontawesomes';
    this.mame = 'fontawesome';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Fontawesome[]>>new Subject();
    this.mockedItems = FontawesomeItemsMock;
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new Fontawesome(item);
  }
  newCache() {
    return new FontawesomesService(this.httpHelper, this.endpointHelper);
  }
}
