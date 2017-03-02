import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ContentType } from './models/content-type.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { ResponseService } from './response.service';
@Injectable()
export class ContentTypesService extends ResourceService {
  public items$: Subject<ContentType[]>;
  public items: ContentType[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'content_types';
    this.resourceName = 'content_type';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<ContentType[]>>new Subject();
  }
  transformModel(item: any) {
    return new ContentType(item);
  }
  newCache() {
    return new ContentTypesService(this.http, this.response);
  }
}
