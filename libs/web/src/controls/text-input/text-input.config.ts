import { Injectable } from '@angular/core';

@Injectable()
export class TextInputConfig {
  errorInTooltip = true;
  maxlength = 250;
  step = 'any';
  // masks
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
  phoneMask = {
    mask: ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  // date
  nativeInputDateFormat = 'YYYY-MM-DD';
  isNativeDateInput = false;
  bsDatepickerConfig = {
    containerClass: 'theme-green',
    showWeekNumbers: false
  };
  dateMask = {
    day: [/[0-3]/, /[0-9]/],
    month: [/[0,1]/, /[0-9]/],
    year: [/[1-2]/, /[0,9]/, /[0-9]/, /[0-9]/]
  };
}
