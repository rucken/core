import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel, ResponseService } from '../../../../../dist';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Injectable()
export class DemoResponseService extends ResponseService {
  get apiUrl() {
    return environment.apiUrl;
  }
}
