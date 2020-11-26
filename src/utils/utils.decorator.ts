import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator'

export function createValidationDecorator(
  validatorConstraint: ValidatorConstraintInterface | Function,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: validatorConstraint,
    })
  }
}
