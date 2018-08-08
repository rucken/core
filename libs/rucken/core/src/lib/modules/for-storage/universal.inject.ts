import { InjectionToken } from '@angular/core';
import { Storage } from './storage';

export const AppStorage: InjectionToken<Storage> = new InjectionToken<Storage>(
  'AppStorage'
);
