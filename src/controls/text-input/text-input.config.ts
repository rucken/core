import { Injectable } from '@angular/core';

@Injectable()
export class TextInputConfig {
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
}
