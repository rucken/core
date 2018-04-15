import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class NotEqualsToPassword implements ValidatorConstraintInterface {
  validate(text: string, validationArguments?: ValidationArguments) {
    if (
      validationArguments.object['password'] &&
      text !== validationArguments.object['password']
    ) {
      return false;
    }
    return true;
  }
}
