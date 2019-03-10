import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { Group } from '../models/group';

export const DEFAULT_GROUPS_CONFIG: IRestProviderOptions<Group> = {
  name: 'group',
  pluralName: 'groups',
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
          return plainToClass(Group, data && data.body && data.body.groups);
        } else {
          return plainToClass(Group, data && data.body && data.body.group);
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
export const GROUPS_CONFIG_TOKEN = 'GroupsConfig';
