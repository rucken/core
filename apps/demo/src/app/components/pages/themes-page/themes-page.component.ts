import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemesService } from '@rucken/web';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesPageComponent {
  constructor(public themesService: ThemesService) {}
}
