import { InjectionToken } from '@angular/core';
import { IStorage } from '../interfaces/storage.interface';

export const STORAGE_CONFIG_TOKEN: InjectionToken<
  IStorage
> = new InjectionToken<IStorage>('StorageConfig');
