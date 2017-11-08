import 'rxjs/add/operator/map';

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from '../base/services/base-repository.service';
import { ContentType } from './../models/content-type.model';

@Injectable()
export class ContentTypesService extends BaseRepositoryService {
  items$: Subject<ContentType[]>;
  items: ContentType[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'content_types';
    this.name = 'content_type';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<ContentType[]>>new Subject();
  }
  transformModel(item: any) {
    return new ContentType(item);
  }
  newCache() {
    return new ContentTypesService(this.injector);
  }
}
