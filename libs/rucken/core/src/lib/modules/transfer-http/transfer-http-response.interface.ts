export interface ITransferHttpResponse {
  method?: 'GET' | 'HEAD' | 'POST';
  body?: any | null;
  headers?: { [k: string]: string[] };
  status?: number;
  statusText?: string;
  url?: string;
}
