export interface IJwtConfig {
  apiUri?: string;
  withoutTokenUrls?: string[];
  headerName?: string;
  headerPrefix?: string;
  tokenName?: string;
  storageKeyName?: string;
}
