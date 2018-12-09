import { Pipe, PipeTransform } from '@angular/core';
import { get, has } from 'object-path';
import { User } from '../entities/models/user';
import { AuthService } from '../modules/auth/services/auth.service';

@Pipe({
  name: 'userPerm'
})
export class UserPermPipe implements PipeTransform {
  constructor(private _authService: AuthService) {}
  transform(
    item: any,
    path = 'users',
    defaultValue: boolean = false,
    trueValue: any = true,
    falseValue: any = false
  ): any {
    const currentUser = this._authService.current;
    if (item && has(item, path) && currentUser && currentUser.id) {
      if (Array.isArray(get(item, path))) {
        const users = get(item, path) as Array<User>;
        return users.filter((user: User) => user.id && user.id === currentUser.id).length > 0 ? trueValue : falseValue;
      } else {
        const user = get(item, path) as User;
        return user.id && user.id === currentUser.id ? trueValue : falseValue;
      }
    } else {
      return defaultValue;
    }
  }
}
