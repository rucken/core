import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { User } from '../../shared/models/user';

@Injectable()
export class AccountStorage {
  data: Object;
  get(): User {
    const user = this.data;
    if (user && user !== 'undefined') {
      return plainToClass(User, user);
    }
    return undefined;
  }
  set(user?: User) {
    if (!user) {
      this.data = undefined;
    } else {
      this.data = classToPlain(user);
    }
  }
  constructor() { }
}
