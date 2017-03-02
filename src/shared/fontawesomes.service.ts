import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Fontawesome } from './models/fontawesome.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { FontawesomeItemsMock } from './mocks/fontawesome-items.mock';
import { ResponseService } from './response.service';
@Injectable()
export class FontawesomesService extends ResourceService {
  public items$: Subject<Fontawesome[]>;
  public items: Fontawesome[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'fontawesomes';
    this.resourceName = 'fontawesome';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<Fontawesome[]>>new Subject();
    this.mockedItems = FontawesomeItemsMock;
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new Fontawesome(item);
  }
  newCache() {
    return new FontawesomesService(this.http, this.response);
  }
}
