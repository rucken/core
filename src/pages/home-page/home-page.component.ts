import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../shared/app.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  title: string;
  readme = ''; // require('html-loader!markdown-loader!./../../../README.md');
  constructor(
    public app: AppService,
    public translateService: TranslateService
  ) {
    this.title = this.translateService.instant('Home');
  }

  ngOnInit() {
    this.app.currentPageName = 'home';
    this.app.currentPageTitle = this.title;
  }
}
