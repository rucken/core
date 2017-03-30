import { Injectable } from '@angular/core';

@Injectable()
export class SelectInputConfig {
  errorInTooltip = true;
  valueField = 'id';
  titleField = 'asString';
  inputTitleField = 'asString';
}
