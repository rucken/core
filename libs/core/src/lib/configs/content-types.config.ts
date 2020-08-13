import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { ContentType } from '../models/content-type';

export const DEFAULT_CONTENT_TYPES_CONFIG: IRestProviderOptions<ContentType> = {
  name: 'content_type',
  pluralName: 'content_types',
  autoload: true,
  paginationMeta: {
    perPage: 5
  },
  actionOptions: {
    responseData: (data: any, action: ProviderActionEnum) => {
      if (action === ProviderActionEnum.Delete) {
        return true;
      } else {
        if (action === ProviderActionEnum.LoadAll) {
          return plainToClass(ContentType, data && data.body && data.body.contentTypes);
        } else {
          return plainToClass(ContentType, data && data.body && data.body.contentType);
        }
      }
    },
    responsePaginationMeta: (data: any, action: ProviderActionEnum): PaginationMeta => {
      return { totalResults: data && data.body && data.body.meta && data.body.meta.totalResults, perPage: undefined };
    }
  },
  restOptions: {
    limitQueryParam: 'per_page',
    pageQueryParam: 'cur_page',
    searchTextQueryParam: 'q'
  }
};
export const CONTENT_TYPES_CONFIG_TOKEN = 'ContentTypesConfig';
