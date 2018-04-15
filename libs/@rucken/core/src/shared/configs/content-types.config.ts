import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { ContentType } from '../models/content-type';

@Injectable()
export class ContentTypesConfig implements IRestProviderOptions<ContentType> {
  name = 'content_type';
  pluralName = 'content_types';
  autoload = true;
  paginationMeta = {
    perPage: 5
  };
  actionOptions = {
    responseData: (data: any, action: ProviderActionEnum) => {
      if (action === ProviderActionEnum.Delete) {
        return true;
      } else {
        if (action === ProviderActionEnum.LoadAll) {
          return plainToClass(ContentType, data.body.contentTypes);
        } else {
          return plainToClass(ContentType, data.body.contentType);
        }
      }
    },
    responsePaginationMeta: (data: any, action: ProviderActionEnum): PaginationMeta => {
      return { totalResults: data.body.meta.totalResults, perPage: undefined };
    }
  };
  restOptions = {
    limitQueryParam: 'per_page',
    pageQueryParam: 'cur_page',
    searchTextQueryParam: 'q'
  };
  constructor() { }
}
