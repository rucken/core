import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements AfterViewInit {
  @Input()
  checkIsDirty?: boolean = undefined;
  @Input()
  tooltipPlacement?: string = undefined;

  get errors(): Observable<any> {
    if (this.form && (this.checkIsDirty !== true || this.form.dirty)) {
      return this.form.customValidateErrors.pipe(
        map(customValidateErrors =>
          customValidateErrors[this.name] ? (customValidateErrors[this.name] as string[]) : []
        )
      );
    } else {
      return of([]);
    }
  }
  @Input()
  form: DynamicFormGroup<any> = undefined;
  @Input()
  set name(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @Input()
  title: string = undefined;

  get valid() {
    return !this.form || this.form.get(this.name).valid;
  }
  private _name: string = undefined;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}
  ngAfterViewInit() {
    const tags = ['input', 'textarea'];
    tags.forEach(tag => {
      const input = this._elementRef.nativeElement.querySelector(tag);
      if (input && input.type !== 'checkbox' && input.type !== 'radio') {
        if (!input.classList.contains('form-control')) {
          this._renderer.addClass(input, 'form-control');
        }
        if (!input.id) {
          this._renderer.setAttribute(input, 'id', this.name);
        }
        if (input.autocomplete !== 'on') {
          this._renderer.setAttribute(input, 'autocomplete', 'off');
        }
      }
    });
  }
}
