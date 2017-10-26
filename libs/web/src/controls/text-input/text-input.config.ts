import { Injectable } from '@angular/core';

@Injectable()
export class TextInputConfig {
  isNativeDateInput = false;
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
  nativeInputDateFormat = 'YYYY-MM-DD';
  inputDateFormat = 'DD.MM.YYYY';
  phoneMask = {
    mask: ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  dateMask = {
    mask: [/[0-3]/, /[0-9]/, '.', /[0,1]/, /[0-9]/, '.', /[1-2]/, /[0,9]/, /[0-9]/, /[0-9]/]
  };
  startingDay = 1;
}
