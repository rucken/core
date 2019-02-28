import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { BindIoInner } from 'ngx-bind-io';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@BindIoInner()
@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements AfterViewInit, OnChanges {
  @Input()
  checkIsDirty?: boolean = undefined;
  @Input()
  tooltipPlacement?: string = undefined;

  @Input()
  form: DynamicFormGroup<any> = undefined;
  @Input()
  name: string = undefined;
  @Input()
  title: string = undefined;
  errors$: Observable<any>;

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
  ngOnChanges(changes: SimpleChanges) {
    if (changes.form && changes.form.currentValue) {
      this.errors$ = changes.form.currentValue.customValidateErrors.pipe(
        map(customValidateErrors =>
          (this.checkIsDirty !== true || changes.form.currentValue.dirty) && customValidateErrors[this.name]
            ? (customValidateErrors[this.name] as string[])
            : []
        )
      );
    }
  }

  getValid() {
    return !this.form || this.form.get(this.name).valid;
  }
}
