import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Theme, ThemesService } from '@rucken/web';
import { Observable } from 'rxjs';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesPageComponent {
  items$: Observable<Theme[]>;
  currentTheme$: Observable<string>;
  constructor(private _themesService: ThemesService) {
    this.items$ = _themesService.repository.items$;
    this.currentTheme$ = _themesService.current$;
  }
  setCurrentTheme(value: string) {
    this._themesService.setCurrent(value);
  }
}
