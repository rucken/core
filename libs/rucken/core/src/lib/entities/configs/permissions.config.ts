import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { Permission } from '../models/permission';

export const defaultPermissionsConfig: IRestProviderOptions<Permission> = {
  name: 'permission',
  pluralName: 'permissions',
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
          return plainToClass(Permission, data.body.permissions);
        } else {
          return plainToClass(Permission, data.body.permission);
        }
      }
    },
    responsePaginationMeta: (
      data: any,
      action: ProviderActionEnum
    ): PaginationMeta => {
      return { totalResults: data.body.meta.totalResults, perPage: undefined };
    }
  },
  restOptions: {
    limitQueryParam: 'per_page',
    pageQueryParam: 'cur_page',
    searchTextQueryParam: 'q'
  }
};
export const PERMISSIONS_CONFIG_TOKEN = 'PermissionsConfig';
