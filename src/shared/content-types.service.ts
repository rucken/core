import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ContentType } from './models/content-type.model';
import { RepositoryService } from './repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class ContentTypesService extends RepositoryService {
  public items$: Subject<ContentType[]>;
  public items: ContentType[];
  public apiUrl: string;

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
