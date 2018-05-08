import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { BasePromptFormModalComponent } from '../../base/base-prompt-form-modal.component';

@Component({
  selector: 'entity-modal',
  templateUrl: './entity-modal.component.html'
})
export class EntityModalComponent extends BasePromptFormModalComponent<any> {

  ignoredFields = ['id'];

  set form(form: DynamicFormGroup<any>) {
    this.keys = form.controls ? Object.keys(form.controls).filter(key =>
      this.ignoredFields.indexOf(
        key.toLowerCase()
      ) === -1
    ) : [];
    this._form = form;
  }
  get form() {
    return this._form;
  }
  keys: string[] = [];

  private _form: DynamicFormGroup<any>;

  constructor(
    protected bsModalRef: BsModalRef
  ) {
    super(bsModalRef);
  }
}
