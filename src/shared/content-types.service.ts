import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ContentType } from './models/content-type.model';
import { BaseRepositoryService } from './../base/base-services/base-repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class ContentTypesService extends BaseRepositoryService {
  items$: Subject<ContentType[]>;
  items: ContentType[];
  apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'content_types';
    this.name = 'content_type';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<ContentType[]>>new Subject();
  }
  transformModel(item: any) {
    return new ContentType(item);
  }
  newCache() {
    return new ContentTypesService(this.repositoryHelper);
  }
}
