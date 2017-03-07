import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ContentType } from './models/content-type.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class ContentTypesService extends RepositoryService {
  public items$: Subject<ContentType[]>;
  public items: ContentType[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'content_types';
    this.mame = 'content_type';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<ContentType[]>>new Subject();
  }
  transformModel(item: any) {
    return new ContentType(item);
  }
  newCache() {
    return new ContentTypesService(this.httpHelper, this.endpointHelper);
  }
}
