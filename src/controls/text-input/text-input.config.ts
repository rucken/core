import { Injectable } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { translate } from '../../shared/utils';
import { TranslateService } from '@ngx-translate/core';

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
  dateOptions: INgxMyDpOptions;
  nativeInputDateFormat = 'YYYY-MM-DD';
  phoneMask = {
    mask: ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  dateMask = {
    mask: [/[0-3]/, /[0-9]/, '.', /[0,1]/, /[1-2]/, '.', /[1-2]/, /[0,9]/, /[0-9]/, /[0-9]/]
  };
  constructor(
    public translateService: TranslateService
  ) {
    this.dateOptions = {
      dateFormat: 'dd.mm.yyyy',
      dayLabels: {
        su: this.translateService.instant('Sun'),
        mo: this.translateService.instant('Mon'),
        tu: this.translateService.instant('Tue'),
        we: this.translateService.instant('Wed'),
        th: this.translateService.instant('Thu'),
        fr: this.translateService.instant('Fri'),
        sa: this.translateService.instant('Sat')
      },
      monthLabels: {
        1: this.translateService.instant('Jan'),
        2: this.translateService.instant('Feb'),
        3: this.translateService.instant('Mar'),
        4: this.translateService.instant('Apr'),
        5: this.translateService.instant('May'),
        6: this.translateService.instant('Jun'),
        7: this.translateService.instant('Jul'),
        8: this.translateService.instant('Aug'),
        9: this.translateService.instant('Sep'),
        10: this.translateService.instant('Oct'),
        11: this.translateService.instant('Nov'),
        12: this.translateService.instant('Dec')
      },
      todayBtnTxt: this.translateService.instant('Today'),
      ariaLabelPrevMonth: this.translateService.instant('Previous month'),
      ariaLabelNextMonth: this.translateService.instant('Next month'),
      ariaLabelPrevYear: this.translateService.instant('Previous year'),
      ariaLabelNextYear: this.translateService.instant('Next year')
    };
  }
}
