import { Component, ViewEncapsulation } from '@angular/core';

import { BasePageComponent } from './../../base/base-page/base-page.component';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class AccountPageComponent extends BasePageComponent {

}
