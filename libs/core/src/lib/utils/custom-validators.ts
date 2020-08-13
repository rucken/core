import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { translate } from './translate';

@ValidatorConstraint()
export class EqualsToOtherProperty implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const otherProperty = args.constraints && args.constraints.length ? args.constraints[0] : '';
    return args.object[otherProperty] === args.value;
  }
  defaultMessage(args: ValidationArguments) {
    return translate('$property must be equal to $constraint1');
  }
}
