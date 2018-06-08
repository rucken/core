import { Pipe, PipeTransform, Injector } from '@angular/core';
import { AccountService, User } from '@rucken/core';
import { has, get } from 'object-path';

@Pipe({
  name: 'userPerm'
})
export class UserPermPipe implements PipeTransform {

  private _accountService: AccountService;
  constructor(
    public injector: Injector
  ) {
    this._accountService = injector.get(AccountService);
  }

  transform(item: any, path = 'users', defaultValue: boolean = false, trueValue: any = true, falseValue: any = false): any {
    const currentUser = this._accountService.current;
    if (item && has(item, path) && currentUser && currentUser.id) {
      if (Array.isArray(get(item, path))) {
        const users = get(item, path) as Array<User>;
        return (users.filter(
          (user: User) =>
            user.id && user.id === currentUser.id
        ).length > 0) ? trueValue : falseValue;
      } else {
        const user = get(item, path) as User;
        return user.id && user.id === currentUser.id ? trueValue : falseValue;
      }
    } else {
      return defaultValue;
    }
  }

}
