import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorsExtractor {
  getValidationErrors(error: any) {
    if (error && error instanceof HttpErrorResponse && (!error.error || (error.error && !error.error.nonFieldErrors))) {
      return error && error.error;
    }
    return undefined;
  }
  getErrorMessage(error: any) {
    if (error && error instanceof HttpErrorResponse && error.error && !!error.error.nonFieldErrors) {
      return error && error.error && error.error.nonFieldErrors;
    }
    return undefined;
  }
}
