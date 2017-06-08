import { Injectable } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

@Injectable()
export class TextInputConfig {
  isNativeDateInput = true;
  errorInTooltip = true;
  maxlength = 250;
  step = 'any';
  currencyMask = {
    prefix: '',
    decimalLimit: 4,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true
  };
  numberMask = {
    prefix: '',
    thousandsSeparatorSymbol: ' '
  };
  dateOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  nativeInputDateFormat = 'YYYY-MM-DD';
  phoneMask = {
    mask: ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  dateMask = {
    mask: [/[0-3]/, /[0-9]/, '.', /[0,1]/, /[1-2]/, '.', /[1-2]/, /[0,9]/, /[1-9]/, /[1-9]/]
  };
}
