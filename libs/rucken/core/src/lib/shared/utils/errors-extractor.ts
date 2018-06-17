import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorsExtractor {
  getValidationErrors(error: any) {
    if (error && error instanceof HttpErrorResponse && error.error.validationErrors) {
      return error && error.error.validationErrors;
    }
    return undefined;
  }
  getErrorMessage(error: any) {
    if (typeof error === 'string') {
      return error;
    }
    if (error && error instanceof HttpErrorResponse && error.error.message) {
      return error && error.error && error.error.message;
    }
    if (error && error.message) {
      return error.message;
    }
    if (error && error.toString) {
      return error.toString();
    }
    console.log(error);
    return undefined;
  }
}
