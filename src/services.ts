/**
 * Import services
 */
import { UserGroupsService } from './shared/user-groups.service';
import { GroupPermissionsService } from './shared/group-permissions.service';
import { PermissionsService } from './shared/permissions.service';
import { AppService } from './shared/app.service';
import { AccountService } from './shared/account.service';
import { UsersService } from './shared/users.service';
import { ThemesService } from './shared/themes.service';
import { HttpHelper } from './shared/helpers/http.helper';
import { UtilsService } from './shared/utils.service';
import { FontawesomesService } from './shared/fontawesomes.service';
import { GroupsService } from './shared/groups.service';
import { ContentTypesService } from './shared/content-types.service';
const RuckenServices = [
  /**
   * Services
   */
  UserGroupsService,
  GroupPermissionsService,
  PermissionsService,
  FontawesomesService,
  HttpHelper,
  AppService,
  AccountService,
  UsersService,
  ThemesService,
  UtilsService,
  GroupsService,
  ContentTypesService
];
export { RuckenServices };
