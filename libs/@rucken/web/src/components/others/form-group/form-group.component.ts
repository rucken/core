import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { DynamicFormGroup, IShortValidationErrors } from 'ngx-dynamic-form-builder';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html'
})
export class FormGroupComponent implements AfterViewInit {

  get errors(): Observable<IShortValidationErrors | string[]> | Observable<any[]> {
    if (this.form && this.form.dirty) {
      return this.form.customValidateErrors.pipe(
        map(customValidateErrors =>
          customValidateErrors[this.name] ? customValidateErrors[this.name] : []
        )
      );
    } else {
      return of([]);
    }
  }
  @Input()
  form: DynamicFormGroup<any>;
  @Input()
  set name(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @Input()
  title: string;

  get valid() {
    return !this.form || this.form.get(this.name).valid;
  }
  private _name: string;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) {
  }
  ngAfterViewInit() {
    const input = this._elementRef.nativeElement.querySelector('input');
    if (
      input &&
      input.type !== 'checkbox' &&
      input.type !== 'radio'
    ) {
      if (!input.classList.contains('form-control')) {
        this._renderer.addClass(input, 'form-control');
      }
      if (!input.id) {
        this._renderer.setAttribute(input, 'id', this.name);
      }
      this._renderer.setAttribute(input, 'autocomplete', 'off');
    }
  }
}
