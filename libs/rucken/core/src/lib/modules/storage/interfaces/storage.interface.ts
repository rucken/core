export interface IStorage {
  readonly length: number;
  clear(): Promise<any>;
  getItem(key: string): Promise<string | null>;
  key(index: number): Promise<string | null>;
  removeItem(key: string): Promise<any>;
  setItem(key: string, data: string): Promise<any>;
  [key: string]: any;
  [index: number]: string;
}
