import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Theme, ThemesService } from '@rucken/web';
import { Observable } from 'rxjs';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesPageComponent {
  items$: Observable<Theme[]>;
  constructor(public themesService: ThemesService) {
    this.items$ = themesService.repository.items$;
  }
}
